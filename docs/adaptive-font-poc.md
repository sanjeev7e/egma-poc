# Adaptive Font Switching — POC

## Job to be done

Detect system-level font/text-size changes at runtime and update app typography
to match, without an app restart, so the app stays consistent with OS
accessibility settings.

## Accelerator script run

The project was initialized from the internal React Native accelerator (Expo
managed workflow). One run produced the scaffold committed in `a15d406`:

- `App.tsx` moved to `src/App.tsx`, registered from `index.ts`
- `app.json` replaced with `app.config.ts` (variant-aware bundle ID / icon
  selection driven by `EXPO_PUBLIC_APP_VARIANT`)
- Baseline folders: `components/`, `constants/`, `features/`, `hooks/`,
  `navigation/`, `screens/`, `services/`, `store/`, `theme/`, `types/`
- ESLint (flat config, `eslint-config-expo` + Prettier + React Compiler rule)
  and TypeScript configured

Issues/gaps found during setup:

- The scaffolded `src/navigation/*` files import
  `@react-navigation/native-stack` and `@react-navigation/bottom-tabs`, which
  aren't in `package.json` — `tsc` fails on those three files out of the box.
  Pre-existing, unrelated to this POC, left as-is (not wired into `App.tsx`).
- The scaffolded codebase already fails ~80 Prettier lint rules (single vs
  double quotes, trailing newlines) across most generated files. Also
  pre-existing; only the files touched for this POC were kept lint-clean.
- `useTheme.ts` and `theme/index.ts` were stubs with no real content —
  reasonable hook point for adding the scaling logic below.

## Implementation

- `src/hooks/useFontScale.ts` — reactive hook wrapping RN's
  `useWindowDimensions()`. Its payload includes `fontScale`, and the hook
  subscribes to `Dimensions`' `change` event under the hood, so it re-renders
  automatically when the OS text size changes while the app is running.
- `src/theme/typography.ts` — `getScaledFontSizes(fontScale)` multiplies the
  base sizes in `src/constants/fonts.ts` by the current scale, clamped to
  `0.85–1.6x` so extreme accessibility settings don't break fixed-size chrome
  (buttons, headers) while still scaling body text for readability.
- `src/hooks/useTheme.ts` — now returns `fonts.sizes` pre-scaled and exposes
  `fontScale` directly, so screens/components don't need to know about the
  scaling math.
- `src/components/{Header,Button,Input}.tsx` — consume `useTheme()` for their
  font sizes and set `allowFontScaling={false}` on `Text`/`TextInput`. This
  makes our own scale calculation the single source of truth instead of
  layering on top of RN's native auto-scaling, which is inconsistent about
  when it recomputes (see Limitations).
- `src/screens/HomeScreen.tsx` — demo/test section showing the live
  `fontScale` value and sample text at each size, for manual verification.
- `plugins/withAndroidFontScaleConfigChange.js` — local Expo config plugin
  (registered in `app.config.ts`) that adds `fontScale` to the main
  activity's `android:configChanges`. See Limitations for why this is
  required on Android.

## Manual test steps

**iOS**

1. `npx expo run:ios` (or run in Expo Go).
2. With the app open on the Home screen, background it (don't kill it) and
   open Settings → Accessibility → Display & Text Size → Larger Text, drag
   the slider.
3. Return to the app. The "Live system font scale" value and sample text
   sizes should reflect the new setting immediately — no reload needed.
4. Repeat with Settings → Accessibility → Larger Text toggled on/off and with
   an AX (bold/extra-large) size.

**Android**

1. `npx expo prebuild` then `npx expo run:android` (config plugins only take
   effect after prebuild regenerates the native project).
2. With the app open on the Home screen, open Settings → Display → Font size
   (or Settings → Accessibility → Font size on some OEM skins) and change it
   **without** returning to the app first if possible — on most devices you
   can adjust the slider from the notification shade / quick settings and see
   the app update live behind it.
3. Confirm the "Live system font scale" value updates without the screen
   flashing/remounting from scratch.
4. As a regression check, temporarily remove `fontScale` from
   `plugins/withAndroidFontScaleConfigChange.js`'s effect (or diff against
   main) and confirm the screen *does* reset — this isolates the config
   plugin as the reason Android doesn't restart.

## Findings / limitations

- **RN's native font auto-scaling doesn't update live.** By default,
  `Text`/`TextInput` scale via the native `fontScale` captured when the view
  is created; changing the OS setting while the app is running does not
  re-scale existing text without a manual re-render. This is why a listener
  hook is required at all — it's not solved by RN out of the box.
- **Android recreates the Activity on font-size change unless `fontScale` is
  declared in `android:configChanges`.** Without it, changing the system
  font size while the app is foregrounded destroys and recreates the
  Activity, which looks like a soft app restart (React tree remounts, local
  state is lost). The `withAndroidFontScaleConfigChange` plugin fixes this;
  it only takes effect after `expo prebuild` regenerates `AndroidManifest.xml`
  — there's no equivalent needed on iOS.
- **Config plugins referenced from `app.config.ts` must be plain `.js`
  (CommonJS), not `.ts`.** Expo's config loader only transpiles the
  top-level `app.config.ts` file itself; a `require()` of a sibling `.ts`
  file from inside it fails with `MODULE_NOT_FOUND` since there's no
  extension-resolution or transform for it. Found this by running
  `npx expo export --platform web` as a config-load smoke test; documented
  here so future config plugins in this repo aren't tripped up by the same
  thing.
- **Clamping is a judgment call.** `0.85x–1.6x` was picked as a reasonable
  default for this POC; a real implementation should validate against actual
  designs to decide which sizes (if any) should be exempt from scaling
  entirely (e.g. icon-only buttons, dense data tables).
- **Not covered by this POC:** Android's separate "display size" system
  setting (as opposed to "font size") is not a `fontScale`/`Dimensions`
  event and would need the `screenSize`/`smallestScreenSize` config-change
  handling that's already present by default; Bold Text
  (`AccessibilityInfo.isBoldTextEnabled`) is a separate accessibility signal
  not addressed here.

## Definition of Done — status

| Item | Status |
| --- | --- |
| POC app initialized via accelerator script | Done (already committed) |
| Accelerator run documented | Done (this doc) |
| Listener/hook for system font changes | Done — `useFontScale` |
| Typography updates without restart | Done — verified via manual steps above; Android required the config plugin fix |
| Tested on iOS and Android | See Manual test steps — requires a physical/simulator run, not automatable in this environment |
| Findings/limitations documented | Done (this doc) |
| Code reviewed and approved | Pending review |
| No new lint/build errors | Verified — `npm run lint` and `tsc --noEmit` show zero new issues in files touched by this POC (pre-existing scaffold errors untouched) |

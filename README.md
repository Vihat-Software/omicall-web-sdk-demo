# OMICall Web SDK Demo

A small React app for trying out the OMICall Web SDK in the browser. It loads the SDK from the OMICall CDN, lets you tweak every init/register option from a UI, and gives you click-to-call plus a live event log. It supports both SDK generations:

| Source | Global              | Script URL                                                                             |
| ------ | ------------------- | -------------------------------------------------------------------------------------- |
| **v2** | `window.omiSDK`     | `https://cdn.omicrm.com/sdk/<version>/sdk.min.js` (`sdk.dev.min.js` for the `dev` env) |
| **v3** | `window.OMICallSDK` | `https://cdn.omicrm.com/sdk/web/<version>/core.min.js`                                 |

Default versions: v2 `2.0.0`, v3 `3.1.1`.

## Documentation

- Official integration guide and changelog: <https://api.omicall.com/sdk/web-sdk>

## What it does

The page has three columns and an action toolbar:

- **Connection** – pick the SDK source (v2/v3), environment, and version; enter the SIP realm, user and password. The SDK script is fetched automatically as soon as the source/version/env is chosen, and its load status is shown.
- **Options** – SDK-specific `init` options (theme, language, ringtone volume, dial position, phone masking, …) and, for v3, `register` options (guest mode, `sipUid`, `expires`, `wssUri`, audio codecs, ICE transport policy). Each form also has an **advanced JSON** field that is merged into the config for options the UI doesn't cover.
- **Click-to-Call** – enter a phone number and place a call once registered. For v2 there is also a Busy/DND toggle. An **event log** shows SDK events (`register`, `invite`, `accepted`, `ended`, `inviteRejected`), successes and errors.

Toolbar flow: **① Init SDK → ② Register → Unregister**.

## How to use

1. Select the SDK source, environment and version.
2. Fill in SIP realm, SIP user and SIP password (required to unlock Init).
3. Adjust init/register options if needed.
4. Click **Init SDK**, then **Register**. Watch the status chips and event log.
5. Enter a phone number and click **Click to call**. With SDK v3 you can also click **Video call** for internal numbers (2-7 digits) or ZCC numbers (21-22 digits).

Your configuration is saved in `localStorage` and can also be shared through URL query parameters: `sdkSource`, `sdkEnv`, `sdkVersion`, `sipRealm`, `sipUser`, `sipPassword`, `phoneNumber`. The URL is kept in sync as you edit, e.g.

```
?sdkSource=v3&sdkVersion=3.0.46&sipRealm=my-realm&sipUser=100
```

Init/register options can be prefilled the same way with `<sdk>.<init|register>.<option>` keys (`advancedJson` is not supported). Booleans take `true`/`false`, arrays are comma-separated, and only non-default values are written back to the URL:

```
?v3.init.lng=vi&v3.init.dialPosition=left&v3.register.isGuest=true&v3.register.audioCodecs=opus,pcma
?v2.init.theme=salesforce&v2.init.debug=true&v2.init.ringtoneVolume=0.5
```

URL values take precedence over `localStorage`.

> The password is also written to the URL and `localStorage`. Don't share links or use shared browsers with real credentials.

## Development

Requires Node.js and [Yarn 4](https://yarnpkg.com) (`packageManager: yarn@4.18.0`, via Corepack).

```bash
yarn install
yarn dev        # start the Vite dev server
yarn build      # build a single-file app to dist/demo_v2.html
yarn preview    # preview the production build
yarn lint       # eslint --fix
yarn format     # prettier --write
```

The build output `dist/demo_v2.html` is fully self-contained (JS/CSS inlined), so it can be opened directly via `file://` or dropped on any static host.

## Tech stack

React 19, Vite, Tailwind CSS 4, [HeroUI](https://heroui.com), `lucide-react`.

## Project structure

```
src/
  components/   layout, columns (Connection / Options / Call), option forms, ui primitives
  lib/          SDK adapters (v2, v3), script loader, SDK actions, URL/localStorage sync
  state/        app state context, hooks and default options
```

Each SDK version is wrapped in an adapter (`src/lib/adapters`) exposing the same interface (`loadSdk`, `init`, `register`, `unregister`, `makeCall`, `setBusy`, `onEvent`), so the UI is version-agnostic. To support another SDK version, add an adapter and register it in `adapters/index.js`.

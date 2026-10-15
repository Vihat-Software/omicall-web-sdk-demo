Status icons (used across Header.jsx, ConnectionColumn.jsx, in the SDK_STATUS_MAP / REGISTER_STATUS_MAP / SCRIPT_STATUS_MAP objects):

| Emoji | Meaning      | Used for                                         | Replace with                        |
| ----- | ------------ | ------------------------------------------------ | ----------------------------------- |
| ⚪    | idle/neutral | SDK idle, Unregistered, Script not loaded        | — (no matching icon asset)          |
| 🔄    | in progress  | Initializing…, Registering…, Script loading…     | assets/icons/UpdateLeftRotation.tsx |
| ✅    | success      | SDK ready, Registered, Script loaded             | assets/icons/Checkmark.tsx          |
| ❌    | failure      | Init failed, Register failed, Script load failed | assets/icons/Error.tsx              |

Action/status glyphs elsewhere:

| Emoji   | File                 | Context                            | Replace with                                  |
| ------- | -------------------- | ---------------------------------- | --------------------------------------------- |
| 🙈 / 👁️ | PasswordField.jsx:39 | password show/hide toggle          | assets/icons/Blind.tsx / assets/icons/Eye.tsx |
| ①       | ActionToolbar.jsx:26 | "① Init SDK" button label (step 1) | — (no matching icon asset)                    |
| ②       | ActionToolbar.jsx:34 | "② Register" button label (step 2) | — (no matching icon asset)                    |
| 🔴 / 🟢 | CallColumn.jsx:26    | busy/available status dot          | — (no matching icon asset)                    |
| 📞      | CallColumn.jsx:47    | "Click to call" button label       | assets/icons/Phone.tsx                        |

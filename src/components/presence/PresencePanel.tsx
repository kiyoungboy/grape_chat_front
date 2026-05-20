import styles from "./PresencePanel.module.css";

import { usePresenceStore } from "@/features/presence/store/presence.store";

import PresenceUserItem from "./PresenceUserItem";

export default function PresencePanel() {

    const users = usePresenceStore(
        (state) => state.users
    );

    return (
        <aside className={styles.panel}>

            <div className={styles.header}>
                <h3>접속 상태</h3>
            </div>

            <div className={styles.userList}>

                {users.map((user) => (
                    <PresenceUserItem
                        key={user.userKey}
                        user={user}
                    />
                ))}

            </div>

        </aside>
    );
}
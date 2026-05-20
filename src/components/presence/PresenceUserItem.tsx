import styles from "./PresenceUserItem.module.css";

import type { PresenceUser }
from "@/features/presence/types/presence.type";

interface Props {
    user: PresenceUser;
}

export default function PresenceUserItem({
    user,
}: Props) {

    const isOnline =
        user.onlineYn === "Y";

    return (
        <div className={styles.item}>

            <div
                className={`
                    ${styles.status}

                    ${
                        isOnline
                            ? styles.online
                            : styles.offline
                    }
                `}
            />

            <div className={styles.info}>

                <strong>
                    {user.userKey}
                </strong>

                <span>
                    {
                        isOnline
                            ? "온라인"
                            : "오프라인"
                    }
                </span>

            </div>

        </div>
    );
}
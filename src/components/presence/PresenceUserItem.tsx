import styles from "./PresenceUserItem.module.css";

import type { ChatRoomParticipant, PresenceUser }
from "@/features/presence/types/presence.type";

interface Props {
    user: PresenceUser | ChatRoomParticipant;
    roomMode?: boolean;
}

export default function PresenceUserItem({
    user,
    roomMode = false,
}: Props) {

    const isOnline =
        "onlineYn" in user && user.onlineYn === "Y";

    return (
        <div className={styles.item}>
            {!roomMode && (
                <div className={`${styles.status}${isOnline ? styles.online : styles.offline}`} />
            )}
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
                    {user.nickname || user.userEmail || user.userKey}
                </strong>
                
                {!roomMode &&(
                    <span>
                        {
                            isOnline
                                ? "온라인"
                                : "오프라인"
                        }
                    </span>
                )}

            </div>

        </div>
    );
}
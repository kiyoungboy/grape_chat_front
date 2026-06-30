import styles from "./FriendList.module.css";
import type { Friend } from "@/features/friend/types/friend.type";

interface Props {
    friends: Friend[];
    onDoubleClickFriend?: (friend: Friend) => void;
}

export default function FriendList({
    friends,
    onDoubleClickFriend,
}: Props) {
    if (friends.length === 0) {
        return (
            <div className={styles.empty}>
                친구가 없습니다.
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {friends.map((friend) => (
                <div
                    key={friend.friendUserKey}
                    className={styles.item}
                    onDoubleClick={() => onDoubleClickFriend?.(friend)}
                >
                    <span
                        className={
                            friend.onlineYn === "Y"
                                ? styles.online
                                : styles.offline
                        }
                    />

                    <div className={styles.info}>
                        <strong>{friend.friendNickname}</strong>
                        <p>{friend.friendEmail}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
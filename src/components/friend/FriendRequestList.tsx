import type { FriendRequest } from "@/features/friend/types/friend.type";
import {
    acceptFriendRequest,
    rejectFriendRequest,
} from "@/features/friend/services/friend.service";

interface Props {
    requests: FriendRequest[];
    onChanged: () => void;
}

export default function FriendRequestList({
    requests,
    onChanged,
}: Props) {
    const handleAccept = async (friendKey: string) => {
        try {
            await acceptFriendRequest(friendKey);
            onChanged();
        } catch (error) {
            console.error(error);
            alert("친구 요청 수락 중 오류가 발생했습니다.");
        }
    };

    const handleReject = async (friendKey: string) => {
        try {
            await rejectFriendRequest(friendKey);
            onChanged();
        } catch (error) {
            console.error(error);
            alert("친구 요청 거절 중 오류가 발생했습니다.");
        }
    };

    if (requests.length === 0) {
        return <div style={{ padding: 12, color: "#888" }}>받은 요청이 없습니다.</div>;
    }

    return (
        <div>
            {requests.map((request) => (
                <div
                    key={request.friendKey}
                    style={{
                        padding: 10,
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <strong>{request.requestUserNickname}</strong>
                    <p style={{ margin: "4px 0", fontSize: 12 }}>
                        {request.requestUserEmail}
                    </p>

                    <button onClick={() => handleAccept(request.friendKey)}>
                        수락
                    </button>

                    <button onClick={() => handleReject(request.friendKey)}>
                        거절
                    </button>
                </div>
            ))}
        </div>
    );
}
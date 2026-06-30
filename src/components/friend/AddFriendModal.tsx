import { useState } from "react";
import styles from "./AddFriendModal.module.css";

import {
    searchFriend,
    requestFriend,
} from "@/features/friend/services/friend.service";

import { useFriendStore } from "@/features/friend/store/friend.store";

interface Props {
    open: boolean;
    onClose: () => void;
    onRequested?: () => void;
}

export default function AddFriendModal({
    open,
    onClose,
    onRequested,
}: Props) {
    const [type, setType] = useState<"nickname" | "email">("nickname");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const searchResult = useFriendStore((state) => state.searchResult);
    const setSearchResult = useFriendStore((state) => state.setSearchResult);

    if (!open) return null;

    const handleSearch = async () => {
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            setLoading(true);

            const result = await searchFriend(type, keyword.trim());

            setSearchResult(result);

            if (!result) {
                alert("일치하는 사용자가 없습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("친구 검색 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async () => {
        if (!searchResult) return;

        if (searchResult.friendStatus !== "NONE") {
            alert("친구 요청을 보낼 수 없는 상태입니다.");
            return;
        }

        try {
            await requestFriend({
                targetUserKey: searchResult.userKey,
            });

            alert("친구 요청을 보냈습니다.");

            setSearchResult({
                ...searchResult,
                friendStatus: "REQUESTED",
            });

            onRequested?.();
        } catch (error) {
            console.error(error);
            alert("친구 요청 중 오류가 발생했습니다.");
        }
    };

    const getStatusText = () => {
        if (!searchResult) return "";

        switch (searchResult.friendStatus) {
            case "NONE":
                return "친구 요청 가능";
            case "REQUESTED":
                return "이미 요청한 사용자";
            case "RECEIVED":
                return "나에게 친구 요청을 보낸 사용자";
            case "ACCEPTED":
                return "이미 친구";
            case "BLOCKED":
                return "요청 불가";
            default:
                return "";
        }
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>친구 추가</h3>
                    <button onClick={onClose}>×</button>
                </div>

                <div className={styles.searchArea}>
                    <select
                        value={type}
                        onChange={(e) =>
                            setType(e.target.value as "nickname" | "email")
                        }
                    >
                        <option value="nickname">닉네임</option>
                        <option value="email">이메일</option>
                    </select>

                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={
                            type === "nickname"
                                ? "닉네임을 입력하세요"
                                : "이메일을 입력하세요"
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <button onClick={handleSearch} disabled={loading}>
                        검색
                    </button>
                </div>

                <div className={styles.resultArea}>
                    {searchResult && (
                        <div className={styles.resultItem}>
                            <div>
                                <strong>{searchResult.userNickname}</strong>
                                <p>{searchResult.userEmail}</p>
                                <span>{getStatusText()}</span>
                            </div>

                            <button
                                onClick={handleRequest}
                                disabled={searchResult.friendStatus !== "NONE"}
                            >
                                친구 요청
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
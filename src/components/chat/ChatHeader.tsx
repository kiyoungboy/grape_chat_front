import styles from "./ChatHeader.module.css";
import { useRoomStore } from "@/features/chat/store/room.store";
import { useWebSocketStore } from "@/features/websocket/store/websocket.store";
import { exitRoom } from "@/features/chat/api/exitRoom.api";

export default function ChatHeader() {

    const currentRoom =
        useRoomStore(
            (state) =>
                state.currentRoom
        );

    const connected =
        useWebSocketStore(
            (state) =>
                state.connected
        );

    const connecting =
        useWebSocketStore(
            (state) =>
                state.connecting
        );

    const removeRoom =
        useRoomStore(
            (state) => state.removeRoom
        );

    const setCurrentRoom =
        useRoomStore(
            (state) => state.setCurrentRoom
        );

    const handleExitRoom =
        async () => {

        if(!currentRoom){
            return;
        }

        try{

            await exitRoom(
                currentRoom.roomKey
            );

            removeRoom(
                currentRoom.roomKey
            );

            setCurrentRoom(undefined);

        } catch(error){

            console.error(error);
        }
    };
        

    return (
        <div className={styles.header}>

            <div>
                <button
                    className={styles.exitButton}

                    onClick={handleExitRoom}
                >
                    나가기
                </button>
                <h3>
                    {
                        currentRoom?.roomName ||
                        "채팅방"
                    }
                </h3>

                <span>
                    내부 관리자 채팅
                </span>

            </div>

            <div
                className={`
                    ${styles.status}

                    ${
                        connecting
                            ? styles.connecting
                            : connected
                            ? styles.connected
                            : styles.disconnected
                    }
                `}
            >

                {
                    connecting
                        ? "연결 중..."
                        : connected
                        ? "연결됨"
                        : "연결 끊김"
                }

            </div>

        </div>
    );
}
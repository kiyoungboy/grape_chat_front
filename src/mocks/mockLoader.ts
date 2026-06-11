import { mockRooms }
from "./room.mock";

import { mockPresenceUsers }
from "./presence.mock";

import { mockParticipants }
from "./participant.mock";

import { useRoomStore }
from "@/features/chat/store/room.store";

import { usePresenceStore }
from "@/features/presence/store/presence.store";

export function loadMockData() {

    console.log(
        "[MOCK] loading..."
    );

    useRoomStore
        .getState()
        .setRooms(mockRooms);

    usePresenceStore
        .getState()
        .setUsers(mockPresenceUsers);

    usePresenceStore
        .getState()
        .setRoomParticipants(
            mockParticipants
        );

    console.log(
        "[MOCK] loaded"
    );
}
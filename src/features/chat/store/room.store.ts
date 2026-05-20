import { create } from "zustand";

import type { ChatRoom } from "../types/room.type";

interface RoomState {
    rooms: ChatRoom[];
    currentRoom?: ChatRoom;
    setRooms: (rooms: ChatRoom[]) => void;
    setCurrentRoom: (room?: ChatRoom) => void;

    updateRoomLastMessage: (
        roomKey: string,
        message: string
    ) => void;

    increaseUnreadCount: (
        roomKey: string
    ) => void;

    clearUnreadCount: (
        roomKey: string
    ) => void;

    addRoom: (
        room: ChatRoom
    ) => void;

    removeRoom: (
        roomKey: string
    ) => void;
}


export const useRoomStore = create<RoomState>((set) => ({
    rooms: [],
    currentRoom: undefined,

    setRooms: (rooms) =>
        set({
            rooms,
        }),

    setCurrentRoom: (room) =>
        set({
            currentRoom: room,
        }),

    updateRoomLastMessage: (roomKey, message) =>
        set((state) => {
            const updatedRooms = state.rooms.map((room) => {
                if(room.roomKey !== roomKey){
                    return room;
                }

                return {
                    ...room,
                    lastMessage: message,
                    lastMessageAt: new Date().toISOString(),
                };
            });

                updatedRooms.sort((a, b) => {
                    return (
                        new Date(
                            b.lastMessageAt || 0
                        ).getTime() -
                        new Date(
                            a.lastMessageAt || 0
                        ).getTime()
                    );
                });

                return { rooms: updatedRooms, };
        }),
    
    increaseUnreadCount: (roomKey) =>
        set((state) => ({
            rooms: state.rooms.map((room) => {
                if(room.roomKey !== roomKey){
                    return room;
                }

                return {
                    ...room,
                    unreadCount: room.unreadCount + 1,
                };
            }),
        })),

    clearUnreadCount: (roomKey) =>
        set((state) => ({
            rooms: state.rooms.map((room) => {
                if(room.roomKey !== roomKey) {
                    return room;
                }

                return {
                    ...room,
                    unreadCount: 0,
                };
            }),
        })),

    addRoom: (room) => 
        set((state) => ({
            rooms: [
                room,
                ...state.rooms,
            ],
        })),

    removeRoom: (roomKey) => 
        set((state) => ({
            rooms: state.rooms.filter(
                (room) => room.roomKey !== roomKey
            ),
        })),
}));
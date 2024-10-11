/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 VectorGlitch
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import ErrorBoundary from "@components/ErrorBoundary";
import definePlugin from "@utils/types";
import { Message, User } from "discord-types/general";

interface UsernameProps {
    author: { nick: string; };
    message: Message;
    withMentionPrefix?: boolean;
    isRepliedMessage: boolean;
    userOverride?: User;
}


export default definePlugin({
    name: "Teagan Control",
    description: "Never Enough Teagan",
    authors: [{ name: "VectorGlitch", id: 140901241008947200n }],
    patches: [
        {
            find: '?"@":""',
            replacement: {
                match: /(?<=onContextMenu:\i,children:).*?\)}/,
                replace: "$self.renderUsername(arguments[0])}"
            }
        },
    ],

    renderUsername: ErrorBoundary.wrap(({ author, message, isRepliedMessage, withMentionPrefix, userOverride }: UsernameProps) => {

        try {
            const user = userOverride ?? message.author;
            let { username } = user;
            const teagan = "teagan~";
            if (teagan)
                username = (teagan as any).globalName || username;

            const nick = teagan;
            const prefix = withMentionPrefix ? "@" : "";

            if (isRepliedMessage && !teagan || username.toLowerCase() === nick.toLowerCase())
                return <>{prefix}{nick}</>;

            return <>{prefix}{teagan}</>;
        } catch {
            return <>{author?.nick}</>;
        }
    }, { noop: true }),

});

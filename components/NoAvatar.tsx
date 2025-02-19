import React from 'react';

type NoAvatarProps = {
    fullName?: string | null;
}

export const NoAvatar: React.FC<NoAvatarProps> = ({ fullName }) => {
    if (!fullName) return "";
    
    const initials = fullName.split(" ").length > 1
        ? fullName.split(" ")
            .slice(0, 2)
            .map(name => name[0])
            .join("")
        : fullName.substring(0, 2);
    
    return initials.toUpperCase();
};
import React from 'react';
export * from '@mantine/core';
export * from '@mantine/hooks';

declare type INavLinkProps = {
    href: string;
    color?: string;
};
declare const NavLink: React.FC<INavLinkProps>;

export { INavLinkProps, NavLink };

import React, { FC } from 'react';
import { viusage } from '../../../../util';
export declare const NCAAB_MENS_UPCOMING_GAMES_CONTAINER_CLASSNAMES: string[];
export declare const NCAAB_MENS_UPCOMING_GAMES_CONTAINER_STYLE: React.CSSProperties;
export declare const NCAAB_MENS_UPCOMING_GAMES_INNER_CLASSNAMES: string[];
export declare const NCAAB_MENS_UPCOMING_GAMES_INNER_STYLE: React.CSSProperties;
export declare type NcaabMensUpcomingGamesProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    overrideStyle?: boolean;
    classNames?: string[];
    overrideClasses?: boolean;
    responsive?: boolean;
    viusage?: viusage.primary.Viusagelike;
    which?: string;
};
export declare const NcaabMensUpcomingGames: FC<NcaabMensUpcomingGamesProps>;
import React, { FC, ReactElement } from 'react';
import { ontology } from '../../../../../util';
import { SideTeam } from '../../team/SideTeam';

export const BRACKET_MATCHUP_CLASSNAMES: string[] = [
    "grid"
];
export const BRACKET_MATCHUP_STYLE: React.CSSProperties = {
    gridTemplateColumns: "1fr 2fr 1fr",
    gridTemplateRows: "1fr 1fr",
};

export type BracketMatchupProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    overrideStyle?: boolean;
    classNames?: string[];
    overrideClasses?: boolean;
    responsive?: boolean;
    up?: boolean;
    inheritance?: boolean;
    home?: ontology.Teamlike;
    away?: ontology.Teamlike;
};

export const BracketMatchup: FC<BracketMatchupProps> = (props) => {

    const _up = props.up || false;
    const _inheritance = props.inheritance || false;

    const _away = props.away || ontology.MockAway;
    const _home = props.home || ontology.MockHome;

    return (
        <div
            className={[...!props.overrideClasses ? BRACKET_MATCHUP_CLASSNAMES : [], ...props.classNames || []].join(" ")}
            style={{ ...!props.overrideStyle ? BRACKET_MATCHUP_STYLE : {}, ...props.style }}>
            <div style={{
                    ..._inheritance ? {
                        borderBottom: "3px solid",
                    } : {

                    }
                    //  |
                    //  |--
                    //  |
                }}></div>
            <div>
                <SideTeam team={_away} style={{
                    height: '100%'
                }}/>
            </div>
            <div style={{
                ..._up ? {
                    borderBottom: "3px solid",
                    borderRight: "3px solid"
                } : {

                }
                // _
                //  |
            }}>

            </div>
            <div>
                
            </div>
            <div>
                <SideTeam team={_home} style={{
                    height: '100%'
                }}/>
            </div>
            <div style={{
                ..._up ? {

                } : {
                    borderTop: "3px solid",
                    borderRight: "3px solid"
                }
                //  |
                // -
            }}>
            </div>
        </div>
    )
};
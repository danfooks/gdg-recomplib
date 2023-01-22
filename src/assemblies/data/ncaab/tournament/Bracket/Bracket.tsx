import React, { FC, ReactElement } from 'react';
import { ontology } from '../../../../../util';
import { SideTeam } from '../../team/SideTeam';
import { BracketMatchup } from '../BracketMatchup/BracketMatchup';
import { Orientation } from '../util';
import { generate } from 'shortid';

export const BRACKET_CLASSNAMES: string[] = [
    "grid"
];
export const BRACKET_STYLE: React.CSSProperties = {
};

export const getOrientation = (args?: {
    colNo: number;
    totCol: number;
    rowNo: number;
    totRow: number;
}): Orientation => {
    if (args && args.rowNo % 3 === 0) {
        return Orientation.DOWN;
    } else if (args && args.rowNo % 3 === 1) {
        return Orientation.NONE
    } else if (args && args.rowNo % 3 === 2) {
        return Orientation.UP;
    }
    else {
        return Orientation.HIDE;
    }
};

export type BracketProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    overrideStyle?: boolean;
    classNames?: string[];
    overrideClasses?: boolean;
    responsive?: boolean;
    bracket?: ontology.SparseBracketlike;
};

export const Bracket: FC<BracketProps> = (props) => {

    const _bracket = props.bracket || ontology.Mock4TeamBracket;

    // based on the dimensions of the bracket and some display paramters,
    // you will need to compute the number of grid columns and rows
    // if you're straight-up mapping the sparse matrix to the display
    // then this should be the dimensions of the sparse matrix
    const height = _bracket.length;
    const width = _bracket[0].length;
    const rowTemplate: string = Array(_bracket.length).fill("1fr").join(" ");
    const colTemplate: string = Array(_bracket[0].length).fill("1fr").join(" ");

    const bracketEntries = _bracket.map((row, rowNo,) => {
        return row.map((bracketEntry, colNo) => {
            const orientation = getOrientation(bracketEntry[0] && {
                colNo,
                totCol: width,
                rowNo,
                totRow: height,
            });
            console.log('orientation: ', orientation);
            switch (orientation) {
                case Orientation.UP: {
                    return <BracketMatchup {...bracketEntry[0]} key={generate()} up={true} />
                    break;
                }
                case Orientation.DOWN: {
                    return <BracketMatchup {...bracketEntry[0]} key={generate()} up={false} />
                    break;
                }
                case Orientation.NONE: {
                    const away = bracketEntry[0]?.away;
                    const home = bracketEntry[0]?.home;
                    return (
                        <div key={generate()}>
                            <SideTeam team={away} key={generate()} />
                            <SideTeam team={home} key={generate()} />
                        </div>
                    )
                    break
                }
                default: {
                    return (<div key={generate()}></div>);
                    break;
                }
            }
        })
    }).flat();
    console.log('bracketEntries: ', bracketEntries);

    return (
        <div
            className={[...!props.overrideClasses ? BRACKET_CLASSNAMES : [], ...props.classNames || []].join(" ")}
            style={{
                ...!props.overrideStyle ? {
                    ...BRACKET_STYLE,
                    gridTemplateColumns: colTemplate,
                    gridTemplateRows: rowTemplate
                } : {}, ...props.style
            }}>
            {bracketEntries}
        </div>
    )
};
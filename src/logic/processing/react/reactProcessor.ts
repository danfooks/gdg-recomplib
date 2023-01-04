import React, { useEffect, useState } from "react";
import { MainDatabase } from "../../data/database";
import { Processorlike } from "../processor";
import { ontology } from "../../../util";
import { DateComparison } from "../../../util/date";
import { useMultiPowerStore } from "./useMultiPowerStore";
import { useGames } from "./useGames";
import { useTeams } from "./useTeams";
import { useProjections } from "./useProjections";
import { useEfficiency } from "./useEfficiency";
import { useTrends } from "./useTrendTable";
import { usePlayers } from "./usePlayers";
import { useProjectedGames } from "./useProjectedGames";
import { useTopGames } from "./useTopGames";
import { useTopTeams } from "./useTopTeams";
import { useLeagueAverages } from "./useLeagueAverages";
import { useRadars } from "./useRadar";
import { usePointDistribution } from "./usePointDistribution";

export const imemoize = <K extends any[], V>(
    func : (...args : K)=>V
) : (...args : K)=>V =>{

    return (...args : K) : V =>{
        
        const cache : {[key : string] : V} = {};
        const jsonArgs = JSON.stringify(args);
        if(cache[jsonArgs] !== undefined) return cache[jsonArgs];
        return func(...args);

    }

}

export const useOnceProcessor = () : Processorlike =>{

    const {
        getGames,
        getGamesTable,
        getGamesTableBetween,
        getGamesInNextWeek,
        getGamesInNextWeekTable,
        getGamesInNextMonth,
        getGamesInNextMonthTable
    } = useGames()

    const {
        getTeams,
        getTeamsTable
    } = useTeams();

    const {
        getProjectionTable
    } = useProjections();

    const {
        getEfficiencyTable
    } = useEfficiency();

    const {
        getTrendTable
    } = useTrends();

    const {
        getRadarTable
    } = useRadars();

    const {
        getPlayers,
        getPlayersTable
    } = usePlayers();

    const {
        getProjectedGamesTable,
        getProjectedGamesTableBetween,
        getProjectedGamesInNextWeekTable,
        getProjectedGamesInNextMonthTable,
        getProjectedGamesTableBetweenForTeam
    } = useProjectedGames();

    const {
        getTop25Games,
        getGameOfTheDay
    } = useTopGames()


    const {
        getApTop25Teams,
        getGdgTop25Teams,
        getTopOffensiveTeams,
        getTopDefensiveTeams
    } = useTopTeams();

    const {
        getLeagueAverages
    } = useLeagueAverages();

    const {
        getPointDistribution
    } = usePointDistribution();

    return {

        // games
        getGames,
        getGamesTable,
        getGamesTableBetween,
        getGamesInNextWeek,
        getGamesInNextWeekTable,
        getGamesInNextMonth,
        getGamesInNextMonthTable,

        getProjectedGamesTable,
        getProjectedGamesTableBetween,
        getProjectedGamesInNextWeekTable,
        getProjectedGamesInNextMonthTable,
        getProjectedGamesTableBetweenForTeam,

        getTop25Games,
        getGameOfTheDay,

        // teams
        getTeams,
        getTeamsTable,

        getApTop25Teams,
        getGdgTop25Teams,
        getTopOffensiveTeams,
        getTopDefensiveTeams,

        // players
        getPlayers,
        getPlayersTable,

        // efficiency
        getEfficiencyTable,

        // projection
        getProjectionTable,

        // trend
        getTrendTable,

        // radar
        getRadarTable,

        // summary
        getLeagueAverages,

        // point distribution
        getPointDistribution

    };

    return {

    } as any;

}
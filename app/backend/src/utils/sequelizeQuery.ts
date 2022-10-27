export const homeLeaderboard = `
SELECT 
*, 
FORMAT((classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mt.home_team_goals > mt.away_team_goals then 3 
when mt.home_team_goals = mt.away_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mt.home_team) as "totalGames",
SUM(case when mt.home_team_goals > mt.away_team_goals then 1 else 0 end) as "totalVictories",
SUM(case when mt.home_team_goals = mt.away_team_goals then 1 else 0 end) as "totalDraws",
SUM(mt.home_team_goals) as "goalsFavor",
SUM(mt.away_team_goals) as "goalsOwn",
SUM(case when mt.home_team_goals < mt.away_team_goals then 1 else 0 end) as "totalLosses",
SUM(mt.home_team_goals) - SUM(mt.away_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mt 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mt.home_team = t.id
WHERE in_progress = 0
GROUP BY mt.home_team) as classificação
ORDER BY classificação.totalPoints desc,
classificação.goalsBalance desc ,
classificação.goalsFavor desc,
classificação.goalsOwn desc;`;

export const awayLeaderboard = `
SELECT 
*, 
FORMAT((classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mt.away_team_goals > mt.home_team_goals then 3 
when mt.away_team_goals = mt.home_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mt.away_team) as "totalGames",
SUM(case when mt.away_team_goals > mt.home_team_goals then 1 else 0 end) as "totalVictories",
SUM(case when mt.away_team_goals = mt.home_team_goals then 1 else 0 end) as "totalDraws",
SUM(mt.away_team_goals) as "goalsFavor",
SUM(mt.home_team_goals) as "goalsOwn",
SUM(case when mt.away_team_goals < mt.home_team_goals then 1 else 0 end) as "totalLosses",
SUM(mt.away_team_goals) - SUM(mt.home_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mt 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mt.away_team = t.id
WHERE in_progress = 0
GROUP BY mt.away_team) as classificação
ORDER BY classificação.totalPoints desc,
classificação.goalsBalance desc ,
classificação.goalsFavor desc,
classificação.goalsOwn desc;`;

export const homeAwayLeaderboard = `
SELECT 
* 
FROM (SELECT 
home.name,
home.totalPoints + away.totalPoints as 'totalPoints',
home.totalGames + away.totalGames as 'totalGames',
home.totalVictories + away.totalVictories as 'totalVictories',
home.totalDraws + away.totalDraws as 'totalDraws',
home.totalLosses + away.totalLosses as 'totalLosses',
home.goalsFavor + away.goalsFavor as 'goalsFavor',
home.goalsOwn + away.goalsOwn as 'goalsOwn',
home.goalsBalance + away.goalsBalance as 'goalsBalance',
FORMAT((home.totalPoints + away.totalPoints) /
(home.totalGames + away.totalGames * 3) * 100, 2) as "efficiency"
FROM(
SELECT *, 
FORMAT(
(classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mt.away_team_goals > mt.home_team_goals then 3 
when mt.away_team_goals = mt.home_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mt.away_team) as "totalGames",
SUM(
case when mt.away_team_goals > mt.home_team_goals then 1 else 0 end) as "totalVictories",
SUM(
case when mt.away_team_goals = mt.home_team_goals then 1 else 0 end) as "totalDraws",
SUM(mt.home_team_goals) as "goalsOwn",
SUM(
case when mt.away_team_goals < mt.home_team_goals then 1 else 0 end) as "totalLosses",
SUM(mt.away_team_goals) - SUM(mt.home_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mt 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mt.away_team = t.id
WHERE in_progress = 0
GROUP BY mt.away_team) as classificação
ORDER BY classificação.totalPoints desc,
classificação.goalsBalance desc ,
classificação.goalsFavor desc,
classificação.goalsOwn desc
) as away
JOIN (SELECT 
*, 
FORMAT((classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mt.home_team_goals > mt.away_team_goals then 3 
when mt.home_team_goals = mt.away_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mt.home_team) as "totalGames",
SUM(case when mt.home_team_goals > mt.away_team_goals then 1 else 0 end) as "totalVictories",
SUM(case when mt.home_team_goals = mt.away_team_goals then 1 else 0 end) as "totalDraws",
SUM(mt.home_team_goals) as "goalsFavor",
SUM(mt.away_team_goals) as "goalsOwn",
SUM(case when mt.home_team_goals < mt.away_team_goals then 1 else 0 end) as "totalLosses",
SUM(mt.home_team_goals) - SUM(mt.away_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mt 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mt.home_team = t.id
WHERE in_progress = 0
GROUP BY mt.home_team) as classificação
ORDER BY classificação.totalPoints desc,
classificação.goalsBalance desc ,
classificação.goalsFavor desc,
classificação.goalsOwn desc) as home ON away.name = home.name) as home_away
ORDER BY home_away.totalPoints desc,
home_away.goalsBalance desc ,
home_away.goalsFavor desc,
home_away.goalsOwn desc;
`;

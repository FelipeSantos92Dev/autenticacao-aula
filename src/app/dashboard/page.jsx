"use client";
// app/dashboard/page.js - Página protegida (Dashboard)

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [gameData, setGameData] = useState({
    recentGames: [
      { id: 1, name: "Pac-Man", score: 155400, date: "2023-05-18" },
      { id: 2, name: "Space Invaders", score: 12750, date: "2023-05-15" },
      { id: 3, name: "Tetris", score: 32800, date: "2023-05-10" },
    ],
    topGames: [
      { id: 1, name: "Pac-Man", highScore: 234560 },
      { id: 2, name: "Galaga", highScore: 187600 },
      { id: 3, name: "Donkey Kong", highScore: 128540 },
      { id: 4, name: "Frogger", highScore: 98700 },
    ],
  });

  // Proteger esta rota
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.mainContent}>
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeContent}>
            <h2 className={styles.welcomeHeading}>
              Bem-vindo ao seu Dashboard!
            </h2>
            <p className={styles.welcomeText}>
              Acompanhe suas estatísticas, recordes e desafie-se em novos jogos
              retrô.
            </p>
            <button className={styles.playButton}>
              Jogar Agora
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M19.376 12.416L8.777 19.482C8.5417 19.6396 8.2519 19.7158 7.9595 19.6984C7.6672 19.681 7.3907 19.5712 7.177 19.3878C6.9632 19.2044 6.8279 18.9602 6.7934 18.6951C6.7588 18.4299 6.8272 18.1623 6.988 17.94L11.319 12.002L6.988 6.06001C6.84553 5.86909 6.7784 5.63405 6.79669 5.39726C6.81498 5.16047 6.91761 4.93898 7.0829 4.76638C7.24819 4.59378 7.46282 4.48015 7.69661 4.44292C7.9304 4.4057 8.16886 4.44691 8.376 4.56001L19.376 11.584C19.5678 11.7102 19.7224 11.8897 19.8217 12.1035C19.921 12.3173 19.9621 12.5569 19.9408 12.795C19.9195 13.0331 19.8365 13.2618 19.7003 13.454C19.564 13.6461 19.3795 13.7941 19.167 13.881L19.376 12.416Z" />
              </svg>
            </button>
          </div>
          <div className={styles.pixelCharacter}></div>
        </div>

        <div className={styles.statsGridContainer}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Melhor Pontuação</h3>
                <p className={styles.statValue}>234,560</p>
                <p className={styles.statDetail}>Pac-Man</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎮</div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Jogos Jogados</h3>
                <p className={styles.statValue}>42</p>
                <p className={styles.statDetail}>Este mês</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Ranking</h3>
                <p className={styles.statValue}>#28</p>
                <p className={styles.statDetail}>Global</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>⏱️</div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Tempo Jogado</h3>
                <p className={styles.statValue}>18h 24m</p>
                <p className={styles.statDetail}>Este mês</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.gamesSection}>
          <div className={styles.recentGames}>
            <h2 className={styles.sectionTitle}>Partidas Recentes</h2>
            <div className={styles.gamesList}>
              {gameData.recentGames.map((game) => (
                <div key={game.id} className={styles.gameItem}>
                  <div
                    className={styles.gameIcon}
                    style={{ backgroundColor: getRandomColor() }}
                  ></div>
                  <div className={styles.gameInfo}>
                    <h3 className={styles.gameName}>{game.name}</h3>
                    <p className={styles.gameScore}>
                      {game.score.toLocaleString()} pontos
                    </p>
                  </div>
                  <div className={styles.gameDate}>{formatDate(game.date)}</div>
                </div>
              ))}
            </div>
            <button className={styles.viewMoreButton}>
              Ver Histórico Completo
            </button>
          </div>

          <div className={styles.topGames}>
            <h2 className={styles.sectionTitle}>Seus Top Games</h2>
            <div className={styles.topGamesList}>
              {gameData.topGames.map((game, index) => (
                <div key={game.id} className={styles.topGameItem}>
                  <div className={styles.topGameRank}>#{index + 1}</div>
                  <div
                    className={styles.topGameIcon}
                    style={{ backgroundColor: getRandomColor() }}
                  ></div>
                  <div className={styles.topGameInfo}>
                    <h3 className={styles.topGameName}>{game.name}</h3>
                    <p className={styles.topGameScore}>
                      {game.highScore.toLocaleString()} pts
                    </p>
                  </div>
                  <button className={styles.playGameButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M19.376 12.416L8.777 19.482C8.5417 19.6396 8.2519 19.7158 7.9595 19.6984C7.6672 19.681 7.3907 19.5712 7.177 19.3878C6.9632 19.2044 6.8279 18.9602 6.7934 18.6951C6.7588 18.4299 6.8272 18.1623 6.988 17.94L11.319 12.002L6.988 6.06001C6.84553 5.86909 6.7784 5.63405 6.79669 5.39726C6.81498 5.16047 6.91761 4.93898 7.0829 4.76638C7.24819 4.59378 7.46282 4.48015 7.69661 4.44292C7.9304 4.4057 8.16886 4.44691 8.376 4.56001L19.376 11.584C19.5678 11.7102 19.7224 11.8897 19.8217 12.1035C19.921 12.3173 19.9621 12.5569 19.9408 12.795C19.9195 13.0331 19.8365 13.2618 19.7003 13.454C19.564 13.6461 19.3795 13.7941 19.167 13.881L19.376 12.416Z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Função para gerar cores aleatórias para os ícones de jogos
function getRandomColor() {
  const colors = [
    "#ff2d55",
    "#5ac8fa",
    "#ffcc00",
    "#34c759",
    "#af52de",
    "#ff9500",
    "#00c7be",
    "#ff6b6b",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Função para formatar datas
function formatDate(dateString) {
  const options = { day: "numeric", month: "short" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

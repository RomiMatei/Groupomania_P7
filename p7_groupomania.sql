-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 18 oct. 2022 à 21:17
-- Version du serveur : 10.6.7-MariaDB-2ubuntu1.1
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `p7_groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`, `like_date`) VALUES
(20, 1, 130, '2022-10-16 10:06:26');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `content` text NOT NULL,
  `post_created` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `author`, `content`, `post_created`, `image`) VALUES
(130, 1, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 12345678', '2022-10-15 22:00:17', '6c402528-9882-4e07-82df-1544d50a410b.png'),
(131, 1, 'Lorem ipsum dolor sit amet, eirmod tempor invidunt ut labore et dolore magna aliquyam erat 12345', '2022-10-16 14:17:42', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(2) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Utilisateur'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `joined` datetime DEFAULT current_timestamp(),
  `role` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `image`, `joined`, `role`) VALUES
(1, 'admin@groupomania.com', '$2a$08$mGcQVFimZgIWpRnwvK6EEeSwCjInmLrkWUf/GG90FCtfB6ZLVPsFi', 'null', '2022-10-02 20:35:06', 2),
(2, 'sophie@groupomania.com', '$2a$08$qiKFNfWM7R0v9GWjaA7mx.pWGgFPlG79xQAPGcRS0MeHeeivVWDNi', NULL, '2022-10-02 22:42:48', 0),
(4, 'zuher1@groupomania.com', '$2a$08$gLyVnCu9ao2Yw0sFmRK4pOJZyQYJr6d9BdfyQuzNmANipXHlJY00a', NULL, '2022-10-14 17:45:13', 0),
(5, 'zuher2@groupomania.com', '$2a$08$BFvt0wn6xTMP.B1nRKC46uX83m.RlBoAIxREY8K8UitfNV9yrxgD2', NULL, '2022-10-14 18:07:39', 1),
(6, 'zuher52@groupomania.com', '$2a$08$vDuKI075feNm9jLo3tOgf.1HS3fhfRt5SGI29SdJ7MoVSkF9epbdm', NULL, '2022-10-14 18:39:30', 1),
(7, 'zuhedddr2@groupomania.com', '$2a$08$GnmNqC.u5O0rjbOhcoMSuOKE4OphAsZjE8PFn4NBhnlfWg.0MM03O', NULL, '2022-10-14 18:47:29', 1),
(8, 'zuhessssr@groupomania.com', '$2a$08$jaPb/7b8RVSW2uBtJ57MAOf9Ht7wJxnLflX/hVXQ9gb9AiyTuj8fK', NULL, '2022-10-14 18:48:16', 1),
(9, 'zuheddddr1@groupomania.com', '$2a$08$Wp2qmSymwGVtrz0WJHq3YOIU9RSoZb.vHds274HkFiCKGPGjhM7L2', NULL, '2022-10-14 18:50:02', 1),
(10, 'zuhzzer1@groupomania.com', '$2a$08$I.pufUFqGVN6JwAMD6EzQemTazPV1qGO3SKnAphpwI9l4Nk86OIFO', NULL, '2022-10-14 18:51:35', 1),
(11, 'zuhexr2@groupomania.com', '$2a$08$FpE9qLAvTnvPCWHVHsYwNeiy24fkr/aFkNdWllt8RBpmGaBW23Wdu', NULL, '2022-10-14 18:52:12', 1),
(12, 'zuhesdsdr1@groupomania.com', '$2a$08$3M0BsnE0D0Y8DMWR7sm6be5vMO6eHceX3e1zIqyphVyotWpmS1r2q', NULL, '2022-10-14 18:53:03', 1),
(13, 'zsuher@groupomania.com', '$2a$08$mUedwf1nX2N1qsxzxzM8PuuNvGY9CfKr7lEFzhIXrD8ojNThgRqyy', NULL, '2022-10-14 18:53:47', 1),
(14, 'zuhfgdger@groupomania.com', '$2a$08$npUBQTAMa7zSbUURbKspvua16PouT95JFXAx4CWEtWcecf7nGkZCi', NULL, '2022-10-14 19:00:01', 1),
(15, 'zuher19@groupomania.com', '$2a$08$lYBZXeAU.n1QbICdZ8pRZuEq0vktSzkA77cHqFcKDQgEGQFt2LsTy', NULL, '2022-10-15 19:56:43', 1),
(16, 'zuher14@groupomania.com', '$2a$08$XiASdtVm3HTIacpjTUOm6Ok.XM7yp3Gxzmg/KepuBIwFtClg3doP.', NULL, '2022-10-15 19:57:40', 1),
(17, 'zuhe87r@groupomania.com', '$2a$08$ZZISoQ2K1C6KWUEsLoDUEuEKjI5TE9wfwAAw2OK5/PupkRYLlQYsW', NULL, '2022-10-15 19:59:07', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role` (`role`) USING BTREE;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 29 nov. 2022 à 14:38
-- Version du serveur : 8.0.31-0ubuntu0.22.04.1
-- Version de PHP : 8.1.2-1ubuntu2.9

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
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `like_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`, `like_date`) VALUES
(21, 2, 134, '2022-11-29 08:57:02'),
(22, 2, 133, '2022-11-29 08:57:04'),
(23, 18, 136, '2022-11-29 09:00:20'),
(24, 18, 135, '2022-11-29 09:00:22'),
(25, 18, 134, '2022-11-29 09:00:24'),
(26, 19, 136, '2022-11-29 09:01:12'),
(27, 19, 134, '2022-11-29 09:01:14'),
(28, 20, 138, '2022-11-29 09:03:10'),
(29, 20, 134, '2022-11-29 09:03:14'),
(30, 20, 136, '2022-11-29 09:03:17'),
(31, 1, 135, '2022-11-29 13:25:07'),
(32, 1, 137, '2022-11-29 13:25:10'),
(33, 1, 139, '2022-11-29 13:25:14');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `author` int NOT NULL,
  `content` text NOT NULL,
  `post_created` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `author`, `content`, `post_created`, `image`) VALUES
(133, 1, 'Bonjour à tous', '2022-11-29 08:52:52', NULL),
(134, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-11-29 08:54:01', '28f87e64-f4d8-4278-8f64-552fd588b6e5.jpg'),
(135, 2, 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2022-11-29 08:56:58', '31fa278a-525f-48f8-8d0c-ebcd24b56ef4.jpg'),
(136, 2, 'There are many variations of passages of Lorem Ipsum available', '2022-11-29 08:58:02', NULL),
(137, 18, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum', '2022-11-29 09:00:16', '1f3ee228-4059-4ffa-b5b4-2e0fca360059.jpg'),
(138, 19, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum', '2022-11-29 09:01:45', '2648328e-f15c-4a9e-a184-64d4985f12e8.jpg'),
(139, 20, 'The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', '2022-11-29 09:03:06', '96ae25f5-a6aa-4027-817d-a13193e9707b.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `joined` datetime DEFAULT CURRENT_TIMESTAMP,
  `role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `image`, `joined`, `role`) VALUES
(1, 'admin@groupomania.com', '$2a$08$hGXiOfy/lN13RnpavNJpYO6j24QuzbLQfAL24coEzEbcg35fgApLq', 'a672dcbf-13e1-43ed-9e1d-b407df0fa4d5.jpg', '2022-10-02 20:35:06', 2),
(2, 'sophie@groupomania.com', '$2a$08$y.My/SJp2MIyf.gEGbleVeDm6clVZbyaywGgsMi3XHutISa//Msi6', '8efd2d84-cbb9-4587-9bd5-aadc739a1844.jpg', '2022-10-02 22:42:48', 1),
(18, 'michel@groupomania.com', '$2a$08$YWH.cjfcgTDifSKjBPqmveY7HxldJ44c1Y5NwLG5pT3mabeF.TQMe', '4f249655-f12c-4517-acbd-d9cbe7e49c53.jpg', '2022-11-29 08:58:30', 1),
(19, 'anna@groupomania.com', '$2a$08$gRm/KqyUChlCYbvx7G/N1uavj2GuK7s9yJguZ0Zo.aJPMVh4yeNXG', 'ac983430-cfbb-4ec5-93ce-b9009ab07749.png', '2022-11-29 08:58:50', 1),
(20, 'pierre@groupomania.com', '$2a$08$Ev0YAhSEk/qG74tg2AP0CezF6dtaei4Dwr8oodaP4Yo6xTEPAg72W', 'ebbc49da-2337-41aa-91b2-637e8fe0c0d0.png', '2022-11-29 08:59:15', 1);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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

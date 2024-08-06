-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tu_base_de_datos;
USE tu_base_de_datos;

-- Crear la tabla de restaurantes
CREATE TABLE IF NOT EXISTS restaurantes (
  idrest INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mesas INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear la tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
  idemp INT AUTO_INCREMENT PRIMARY KEY,
  nomape VARCHAR(255) NOT NULL,
  idrest INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (idrest) REFERENCES restaurantes(idrest) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
  idreservas INT AUTO_INCREMENT PRIMARY KEY,
  idrest INT NOT NULL,
  idemp INT NOT NULL,
  fecha DATE NOT NULL,
  mesa INT NOT NULL,
  nomapecli VARCHAR(255) NOT NULL,
  comen INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (idrest) REFERENCES restaurantes(idrest) ON DELETE CASCADE,
  FOREIGN KEY (idemp) REFERENCES empleados(idemp) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
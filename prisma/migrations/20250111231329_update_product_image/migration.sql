-- Adiciona a coluna 'quantity' e modifica a coluna 'image' para 'VARBINARY(MAX)' para armazenar a imagem
ALTER TABLE products
  ADD quantity INT NOT NULL DEFAULT 0;

-- Modifica a coluna 'image' para o tipo VARBINARY(MAX), que é utilizado para armazenar dados binários como imagens
ALTER TABLE products
  ALTER COLUMN image VARBINARY(MAX) NOT NULL;

-- Cria o índice único na coluna 'name'
CREATE UNIQUE INDEX products_name_key ON products(name);

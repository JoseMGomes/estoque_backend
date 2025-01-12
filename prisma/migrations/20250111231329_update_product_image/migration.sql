
ALTER TABLE products
  ADD quantity INT NOT NULL DEFAULT 0;

ALTER TABLE products
  ALTER COLUMN image VARBINARY(MAX) NOT NULL;

CREATE UNIQUE INDEX products_name_key ON products(name);

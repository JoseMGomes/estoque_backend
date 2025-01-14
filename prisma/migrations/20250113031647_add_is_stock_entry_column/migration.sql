-- Alterações na tabela 'products'
ALTER TABLE [products]
ADD [is_Stock_entry] BIT NOT NULL DEFAULT 1;

ALTER TABLE [products]
DROP CONSTRAINT IF EXISTS DF_products_createdAt;
ALTER TABLE [products]
DROP CONSTRAINT IF EXISTS DF_products_updatedAt;

ALTER TABLE [products]
ADD CONSTRAINT DF_products_createdAt DEFAULT GETDATE() FOR [createdAt];

ALTER TABLE [products]
ADD CONSTRAINT DF_products_updatedAt DEFAULT GETDATE() FOR [updatedAt];

-- Alterações na tabela 'users'
ALTER TABLE [users]
DROP CONSTRAINT IF EXISTS DF_users_createdAt;
ALTER TABLE [users]
DROP CONSTRAINT IF EXISTS DF_users_updatedAt;

ALTER TABLE [users]
ADD CONSTRAINT DF_users_createdAt DEFAULT GETDATE() FOR [createdAt];

ALTER TABLE [users]
ADD CONSTRAINT DF_users_updatedAt DEFAULT GETDATE() FOR [updatedAt];

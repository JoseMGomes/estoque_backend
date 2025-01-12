
ALTER TABLE [users]
    ADD CONSTRAINT DF_users_createdAt DEFAULT GETDATE() FOR [createdAt];
ALTER TABLE [users]
    ADD CONSTRAINT DF_users_updatedAt DEFAULT GETDATE() FOR [updatedAt];


CREATE TABLE [products] (
    [id] INT IDENTITY(1,1) PRIMARY KEY, 
    [name] NVARCHAR(191) NOT NULL,
    [description] NVARCHAR(191) NOT NULL,
    [price] DECIMAL(65, 30) NOT NULL,
    [image] NVARCHAR(MAX) NOT NULL,   
    [createdAt] DATETIME NOT NULL DEFAULT GETDATE(),
    [updatedAt] DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT [products_name_key] UNIQUE ([name])
);

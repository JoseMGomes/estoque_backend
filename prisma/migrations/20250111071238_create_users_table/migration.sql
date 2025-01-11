-- CreateTable
CREATE TABLE [users] (
    [id] INT IDENTITY(1,1) PRIMARY KEY, 
    [name] NVARCHAR(191) NOT NULL,
    [email] NVARCHAR(191) NOT NULL,
    [password] NVARCHAR(191) NOT NULL,
    [createdAt] DATETIME NOT NULL DEFAULT GETDATE(),
    [updatedAt] DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT [users_email_key] UNIQUE ([email])
);

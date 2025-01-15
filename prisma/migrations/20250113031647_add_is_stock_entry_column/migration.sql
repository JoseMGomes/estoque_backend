ALTER TABLE `products`
    ADD `is_Stock_entry` BOOLEAN NOT NULL DEFAULT 1;

ALTER TABLE `products`
    DROP INDEX IF EXISTS `DF_products_createdAt`;

ALTER TABLE `products`
    DROP INDEX IF EXISTS `DF_products_updatedAt`;


ALTER TABLE `products`
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

ALTER TABLE `products`
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

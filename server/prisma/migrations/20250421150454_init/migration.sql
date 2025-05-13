-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_bulkId_fkey" FOREIGN KEY ("bulkId") REFERENCES "BulkProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

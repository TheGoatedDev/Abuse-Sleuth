-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "idpID" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idpID_key" ON "User"("idpID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

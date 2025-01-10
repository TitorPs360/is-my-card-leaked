import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const maxDuration = 300;

// Type definition for the request body
interface FormData {
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardHolder: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body: FormData = await request.json();

    // Validate required fields
    if (!body.cardNumber || !body.expDate || !body.cvv || !body.cardHolder) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save the new card data
    await prisma.cardData.create({
      data: {
        cardNumber: body.cardNumber,
        expDate: body.expDate,
        cvv: body.cvv,
        cardHolder: body.cardHolder,
      },
    });

    // Get the count of previous records
    const previousCount = await prisma.cardData.count();

    // Subtract 1 to exclude the record we just created
    const totalPreviousRecords = Math.max(0, previousCount - 1);

    return NextResponse.json(
      {
        message: 'Card data saved successfully',
        totalPreviousRecords
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  } finally {
    // Clean up Prisma connection
    await prisma.$disconnect();
  }
}
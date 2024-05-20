import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateUserRequest = await request.json();

    const emailFound = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json({
        message: "Email already exists",
      }, {
        status: 400,
      });
    }

    const userFound = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFound) {
      return NextResponse.json({
        message: "Username already exists",
      }, {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
  }
}

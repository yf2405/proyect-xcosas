const { NextResponse } = require("next/server");
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';



export async function POST(request) {
    try {
        const data = await request.json();

       const emailFound = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(emailFound){
            return NextResponse.json({
                message: "email already exists"
            },{
                status:400
            })
        }
        const userFound = await prisma.user.findUnique({
            where: {
                email: data.username
            }
        })

        if(userFound){
            return NextResponse.json({
                message: "usernamme already exists"
            },{
                status:400
            })
        }

        console.log(data);
        const hashedPassword = await bcrypt.hash(data.password,10)
        const newUser = await prisma.user.create({
            data:{
                username:data.username,
                email:data.email,
                password:hashedPassword
            }
        });

        const {password: _, ...user} = newUser;

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}
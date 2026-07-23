import { prisma } from '../../infrastructure/database/prisma.client';
import { hashUtils } from '../../shared/utils/hash.utils';
import { jwtUtils } from '../../shared/utils/jwt.utils';
import { UserPublic } from '../../shared/types';

interface RegisterDto {
  name: string;
  campus: string;
  email: string;
  password: string;
  skills: string[];
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResult {
  user: UserPublic;
  token: string;
}

function toPublicUser(user: {
  id: string; name: string; campus: string; email: string;
  skills: string; swapScore: number; swapCount: number; createdAt: Date;
}): UserPublic {
  return {
    ...user,
    skills: JSON.parse(user.skills) as string[],
  };
}

export const authService = {
  async register(dto: RegisterDto): Promise<AuthResult> {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new Error('EMAIL_TAKEN');

    const hashed = await hashUtils.hash(dto.password);
    const user = await prisma.user.create({
      data: {
        name: dto.name,
        campus: dto.campus,
        email: dto.email,
        password: hashed,
        skills: JSON.stringify(dto.skills ?? []),
      },
    });

    const token = jwtUtils.sign({ userId: user.id });
    return { user: toPublicUser(user), token };
  },

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const valid = await hashUtils.compare(dto.password, user.password);
    if (!valid) throw new Error('INVALID_CREDENTIALS');

    const token = jwtUtils.sign({ userId: user.id });
    return { user: toPublicUser(user), token };
  },

  async getMe(userId: string): Promise<UserPublic> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('NOT_FOUND');
    return toPublicUser(user);
  },
};

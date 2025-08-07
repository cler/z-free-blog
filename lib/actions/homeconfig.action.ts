'use server';

import prisma from '../db/prisma';
import { formatError } from '../utils';

// 获取当前激活的主页配置
export async function getActiveHomeConfig() {
  try {
    const config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });
    
    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 更新卡片1配置
export async function updateCard1Config(
  title: string,
  content: string,
  icon?: string,
  link?: string
) {
  try {
    // 查找当前激活的配置
    let config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!config) {
      // 如果没有配置，创建默认配置
      config = await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          isActive: true,
          cardTitle1: title,
          cardContent1: content,
          cardIcon1: icon,
          cardLink1: link,
        },
      });
    } else {
      // 更新现有配置
      config = await prisma.homePageConfig.update({
        where: {
          id: config.id,
        },
        data: {
          cardTitle1: title,
          cardContent1: content,
          cardIcon1: icon,
          cardLink1: link,
        },
      });
    }

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 更新卡片2配置
export async function updateCard2Config(
  title: string,
  content: string,
  icon?: string,
  link?: string
) {
  try {
    // 查找当前激活的配置
    let config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!config) {
      // 如果没有配置，创建默认配置
      config = await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          isActive: true,
          cardTitle2: title,
          cardContent2: content,
          cardIcon2: icon,
          cardLink2: link,
        },
      });
    } else {
      // 更新现有配置
      config = await prisma.homePageConfig.update({
        where: {
          id: config.id,
        },
        data: {
          cardTitle2: title,
          cardContent2: content,
          cardIcon2: icon,
          cardLink2: link,
        },
      });
    }

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 更新卡片3配置
export async function updateCard3Config(
  title: string,
  content: string,
  icon?: string,
  link?: string
) {
  try {
    // 查找当前激活的配置
    let config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!config) {
      // 如果没有配置，创建默认配置
      config = await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          isActive: true,
          cardTitle3: title,
          cardContent3: content,
          cardIcon3: icon,
          cardLink3: link,
        },
      });
    } else {
      // 更新现有配置
      config = await prisma.homePageConfig.update({
        where: {
          id: config.id,
        },
        data: {
          cardTitle3: title,
          cardContent3: content,
          cardIcon3: icon,
          cardLink3: link,
        },
      });
    }

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 批量更新所有卡片配置
export async function updateAllCardsConfig(cardsData: {
  card1?: { title: string; content: string; icon?: string; link?: string };
  card2?: { title: string; content: string; icon?: string; link?: string };
  card3?: { title: string; content: string; icon?: string; link?: string };
}) {
  try {
    // 查找当前激活的配置
    let config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    const updateData: any = {};
    
    if (cardsData.card1) {
      updateData.cardTitle1 = cardsData.card1.title;
      updateData.cardContent1 = cardsData.card1.content;
      updateData.cardIcon1 = cardsData.card1.icon;
      updateData.cardLink1 = cardsData.card1.link;
    }
    
    if (cardsData.card2) {
      updateData.cardTitle2 = cardsData.card2.title;
      updateData.cardContent2 = cardsData.card2.content;
      updateData.cardIcon2 = cardsData.card2.icon;
      updateData.cardLink2 = cardsData.card2.link;
    }
    
    if (cardsData.card3) {
      updateData.cardTitle3 = cardsData.card3.title;
      updateData.cardContent3 = cardsData.card3.content;
      updateData.cardIcon3 = cardsData.card3.icon;
      updateData.cardLink3 = cardsData.card3.link;
    }

    if (!config) {
      // 如果没有配置，创建默认配置
      config = await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          isActive: true,
          ...updateData,
        },
      });
    } else {
      // 更新现有配置
      config = await prisma.homePageConfig.update({
        where: {
          id: config.id,
        },
        data: updateData,
      });
    }

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 创建新的主页配置
export async function createHomeConfig(
  configName: string,
  configData: Partial<{
    videoUrl: string;
    videoTitle: string;
    videoPoster: string;
    navTitle: string;
    navSlogan: string;
    navLogo: string;
    personalName: string;
    personalTitle: string;
    personalBio: string;
    personalAvatar: string;
    personalLocation: string;
    personalWebsite: string;
    personalEmail: string;
    githubUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    wechatQr: string;
    cardTitle1: string;
    cardContent1: string;
    cardIcon1: string;
    cardLink1: string;
    cardTitle2: string;
    cardContent2: string;
    cardIcon2: string;
    cardLink2: string;
    cardTitle3: string;
    cardContent3: string;
    cardIcon3: string;
    cardLink3: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  }>
) {
  try {
    const config = await prisma.homePageConfig.create({
      data: {
        configName,
        isActive: false, // 新创建的配置默认不激活
        ...configData,
      },
    });

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 激活指定配置
export async function activateHomeConfig(configId: string) {
  try {
    // 先将所有配置设为非激活状态
    await prisma.homePageConfig.updateMany({
      data: {
        isActive: false,
      },
    });

    // 激活指定配置
    const config = await prisma.homePageConfig.update({
      where: {
        id: configId,
      },
      data: {
        isActive: true,
      },
    });

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 删除配置
export async function deleteHomeConfig(configId: string) {
  try {
    const config = await prisma.homePageConfig.delete({
      where: {
        id: configId,
      },
    });

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 获取所有配置列表
export async function getAllHomeConfigs() {
  try {
    const configs = await prisma.homePageConfig.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return { success: true, data: configs };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// 更新或创建主页配置
export async function updateOrCreateHomeConfig(
  configData: Partial<{
    videoUrl: string;
    videoTitle: string;
    videoPoster: string;
    navTitle: string;
    navSlogan: string;
    navLogo: string;
    personalName: string;
    personalTitle: string;
    personalBio: string;
    personalAvatar: string;
    personalLocation: string;
    personalWebsite: string;
    personalEmail: string;
    githubUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    wechatQr: string;
    cardTitle1: string;
    cardContent1: string;
    cardIcon1: string;
    cardLink1: string;
    cardTitle2: string;
    cardContent2: string;
    cardIcon2: string;
    cardLink2: string;
    cardTitle3: string;
    cardContent3: string;
    cardIcon3: string;
    cardLink3: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  }>
) {
  try {
    // 查找当前激活的配置
    let config = await prisma.homePageConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!config) {
      // 如果没有配置，创建默认配置
      config = await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          isActive: true,
          ...configData,
        },
      });
    } else {
      // 更新现有配置
      config = await prisma.homePageConfig.update({
        where: {
          id: config.id,
        },
        data: configData,
      });
    }

    return { success: true, data: config };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
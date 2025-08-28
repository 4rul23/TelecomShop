import { prisma } from '../lib/prismaClient.js';
import { PRODUCTS_DB, CATEGORIES } from '../src/data/products.js';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // First, create categories
    console.log('📦 Creating categories...');
    const categoryMap = new Map();
    
    for (const categoryName of CATEGORIES) {
      const slug = categoryName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
        
      const category = await prisma.category.upsert({
        where: { slug },
        update: { name: categoryName },
        create: {
          name: categoryName,
          slug
        }
      });
      
      categoryMap.set(categoryName, category.id);
      console.log(`✅ Created/Updated category: ${categoryName} (${slug})`);
    }

    // Then, create products
    console.log('🛍️ Creating products...');
    let successCount = 0;
    let errorCount = 0;

    for (const product of PRODUCTS_DB) {
      try {
        const categoryId = categoryMap.get(product.category);
        
        if (!categoryId) {
          console.warn(`⚠️ Category not found for product: ${product.name} (${product.category})`);
          continue;
        }

        // Clean specifications to ensure it's valid JSON
        let specifications = product.specifications || {};
        if (typeof specifications === 'string') {
          try {
            specifications = JSON.parse(specifications);
          } catch (e) {
            specifications = {};
          }
        }

        const createdProduct = await prisma.product.upsert({
          where: { slug: product.slug },
          update: {
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || null,
            image: product.image,
            brand: product.brand || null,
            stock: product.stock || 0,
            rating: product.rating || 0,
            reviews: product.reviews || 0,
            specifications: specifications,
            categoryId: categoryId,
            dateAdded: product.dateAdded ? new Date(product.dateAdded) : new Date()
          },
          create: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || null,
            image: product.image,
            brand: product.brand || null,
            stock: product.stock || 0,
            rating: product.rating || 0,
            reviews: product.reviews || 0,
            specifications: specifications,
            categoryId: categoryId,
            dateAdded: product.dateAdded ? new Date(product.dateAdded) : new Date()
          }
        });

        console.log(`✅ Created/Updated product: ${product.name} (ID: ${createdProduct.id})`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error creating product ${product.name}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n🎉 Database seeding completed!`);
    console.log(`📊 Statistics:`);
    console.log(`   - Categories: ${CATEGORIES.length}`);
    console.log(`   - Products successful: ${successCount}`);
    console.log(`   - Products failed: ${errorCount}`);
    console.log(`   - Total products: ${PRODUCTS_DB.length}`);

    // Display some statistics
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    
    console.log(`\n📈 Current database stats:`);
    console.log(`   - Total categories in DB: ${totalCategories}`);
    console.log(`   - Total products in DB: ${totalProducts}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Always run the main function when this script is executed
main();

export { seedDatabase };
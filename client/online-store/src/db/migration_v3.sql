CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS currencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) NOT NULL UNIQUE,
  numeric_code INT NOT NULL,
  decimals INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS continents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE,
  continent_codes TEXT[],
  region_codes TEXT[],
  name VARCHAR(255) NOT NULL,
  locale VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE,
  continent_codes TEXT[],
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language VARCHAR(255) NOT NULL,
  alphabetic_code CHAR(2) NOT NULL,
  three_letter_code CHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TYPE app_role AS ENUM('admin', 'moderator', 'user');
CREATE TYPE app_group AS ENUM('admin', 'moderator', 'user');
CREATE TYPE product_type AS ENUM('SIMPLE', 'GROUPED');
CREATE TYPE address_type AS ENUM('BILLING', 'SHIPPING', 'OTHER');

CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_groups (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID,
  group_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  UNIQUE (profile_id, group_name)
);

CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS access_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID NOT NULL,
  policy_name VARCHAR(255) UNIQUE NOT NULL,
  role_name app_role,
  group_name app_group,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (policy_id) REFERENCES policies (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unique_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500) NOT NULL,
  type product_type NOT NULL DEFAULT 'SIMPLE',
  price NUMERIC(10, 2) DEFAULT 0.00,
  sale_price NUMERIC(10, 2) DEFAULT 0.00,
  discount NUMERIC(10, 2) DEFAULT 0.00,
  currency_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (currency_id) REFERENCES currencies (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS grouped_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES products (id) ON DELETE CASCADE
);


CREATE TYPE payment_metadata AS (
    transaction_id VARCHAR(255),
    additional_info JSONB
);

CREATE TYPE order_status AS ENUM (
    'PENDING',
    'CONFIRMED',
    'SHIPPED',
    'DELIVERED',
    'CANCELED',
    'RETURNED',
    'REFUNDED'
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unique_id VARCHAR(255) UNIQUE NOT NULL,
  profile_id UUID NOT NULL,
  order_status order_status DEFAULT 'PENDING',
  order_date TIMESTAMP,
  order_meta JSONB,
  tags TEXT[] DEFAULT '{}',
  coupon VARCHAR(255),
  primary_contact_name VARCHAR(40) NOT NULL,
  primary_contact_email VARCHAR(150) NOT NULL,
  primary_contact_phone VARCHAR(15) NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  shipping_address_id UUID,
  billing_address_id UUID,
  sub_total NUMERIC(10, 2) DEFAULT 0.00,
  shipping_cost NUMERIC(10, 2) DEFAULT 0.00,
  tax NUMERIC(10, 2) DEFAULT 0.00,
  discount NUMERIC(10, 2) DEFAULT 0.00,
  amount NUMERIC(10, 2) DEFAULT 0.00,
  currency_id UUID NOT NULL,
  payment_method VARCHAR(40),
  payment_meta payment_metadata,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile (user_id) ON DELETE SET NULL,
  FOREIGN KEY (currency_id) REFERENCES currencies (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS order_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(500),
  product_meta JSONB,
  quantity INT DEFAULT 1,
  price NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  sale_price NUMERIC(10, 2) GENERATED ALWAYS AS (price - discount) STORED,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  amount NUMERIC(10, 2) GENERATED ALWAYS AS ((quantity * (price - discount)) + tax) STORED,
  currency_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (currency_id) REFERENCES currencies (id) ON DELETE RESTRICT
);

CREATE TABLE order_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id INT NOT NULL,
    order_id UUID NOT NULL,
    invoice_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL, -- paid/unpaid/refnded
    pdf_url VARCHAR(255),
    meta JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (profile_id) REFERENCES profile(user_id)
);


CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tags TEXT[],
  attributes JSONB DEFAULT '{}',
  key VARCHAR(255) NOT NULL DEFAULT '',
  originalname VARCHAR(255),
  encoding VARCHAR(255),
  mimetype VARCHAR(255),
  content_type VARCHAR(255),
  size BIGINT,
  location VARCHAR(255),
  unique_id VARCHAR(12) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS resources_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  media_id UUID NOT NULL,
  "position" INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES media(id)
);

CREATE TABLE IF NOT EXISTS nomination_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "left" INT NOT NULL,
  "right" INT NOT NULL,
  parent_id UUID DEFAULT NULL,
  "name" VARCHAR(255) NOT NULL,
  for_resource_type VARCHAR(255) NOT NULL,
  "position" INT DEFAULT 0,
  slug VARCHAR(255) NOT NULL,
  unique_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  CHECK ("left" < "right"),
  FOREIGN KEY (parent_id) REFERENCES nomination_categories(id)

);

CREATE TABLE IF NOT EXISTS press_releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) DEFAULT '',
  "description" TEXT DEFAULT '',
  "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  slug VARCHAR(255) NOT NULL,
  unique_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address_type address_type NOT NULL DEFAULT 'SHIPPING',
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  location GEOGRAPHY(POINT, 4326),
  country_id UUID NOT NULL,
  meta JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS resources_address (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  address_id UUID NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (address_id) REFERENCES addresses (id)
);

CREATE TABLE IF NOT EXISTS organizations(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  unique_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

-- property start 
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orgnization_id UUID NOT NULL, -- ref
  name VARCHAR(255) NOT NULL,
  property_type VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255) DEFAULT '',
  tagline VARCHAR(255) DEFAULT '',
  basic_info_description TEXT DEFAULT '',
  price_range VARCHAR(255) DEFAULT '',
  amenity_feature TEXT[],
  amenity_feature_description TEXT DEFAULT '',
  "description" TEXT DEFAULT '',
  email VARCHAR(255) NOT NULL,
  visibility VARCHAR(50) DEFAULT 'PUBLIC',
  global_location_number VARCHAR(255) DEFAULT '',
  voting_division_id UUID REFERENCES nations(id),
  slug VARCHAR(255) NOT NULL,
  unique_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (orgnization_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS property_winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  country_id UUID NOT NULL,
  region_id UUID NOT NULL,
  continent_id UUID NOT NULL,
  winner_category VARCHAR NOT NULL,
  division_type VARCHAR NOT NULL,
  "year" NOT NULL
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS property_voting_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  "voting_year" VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS featured_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS property_nomination_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  nomination_category_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (nomination_category_id) REFERENCES(nomination_categories)
) 

CREATE TABLE IF NOT EXISTS property_social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS properties_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL,
  overlay_mask BOOLEAN DEFAULT FALSE, -- create properties_settings table to related settings, <review_email>
  review_email VARCHAR(255),
  is_font_color_black BOOLEAN DEFAULT TRUE, -- create properties_settings table to related settings
  want_to_learn_more BOOLEAN DEFAULT NULL, -- goes in to properties_settings table
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS property_booking_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID UNIQUE REFERENCES properties(id) ON DELETE CASCADE,
  phone_number VARCHAR(255),
  whatsapp_number VARCHAR(255),
  booking_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spa (
  number_of_treatment_rooms INTEGER
) INHERITS (properties);

CREATE TABLE IF NOT EXISTS restaurant (
  cuisines TEXT[],
  maximum_attendee_capacity INT,
) INHERITS (properties);


CREATE TABLE IF NOT EXISTS hotel (
  checkin_time VARCHAR(255),
  checkout_time VARCHAR(255),
  number_of_rooms INTEGER,
  hotel_type TEXT DEFAULT 'HOTEL', -- not sure
) INHERITS (properties);

CREATE TABLE IF NOT EXISTS category_aggregated_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT, 
  entity_id VARCHAR(255) DEFAULT '',
  review_count INT DEFAULT 0,
  avg_rating DECIMAL(3, 2) DEFAULT 0.0,
  category_name VARCHAR NOT NULL DEFAULT 'overall',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aggregated_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT, 
  entity_id VARCHAR(255) DEFAULT '',
  review_count INT DEFAULT 0,
  avg_rating DECIMAL(3, 2) DEFAULT 0.0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);





CREATE TABLE IF NOT EXISTS review_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT, 
  entity_id VARCHAR(255) DEFAULT '',
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  CONSTRAINT unique_entity_id_name UNIQUE (entity_id, name)
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT, 
  entity_id VARCHAR(255) DEFAULT '',
  profile_id UUID,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  reviewer_note TEXT,
  overall_rating NUMERIC CHECK (overall_rating >= 1 AND overall_rating <= 5),
  verified BOOLEAN DEFAULT FALSE,
  verification_code VARCHAR(255) DEFAULT '',
  status TEXT DEFAULT 'PENDING',
  unique_id VARCHAR(255) UNIQUE NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(user_id) ON DELETE CASCADE,
  UNIQUE (profile_id,entity_id)
);

CREATE TABLE IF NOT EXISTS category_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL,
  category_name VARCHAR(255) NOT NULL, 
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);
-- property end

CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voter_name VARCHAR(255) NOT NULL,
  voter_email VARCHAR(255) NOT NULL,
  property_name VARCHAR(255) NOT NULL,
  property_unique_id VARCHAR(255) NOT NULL,
  property_slug VARCHAR(255) NOT NULL,
  property_id INTEGER NOT NULL,
  property_type VARCHAR(255) NOT NULL,
  property_media JSONB,
  nomination_category_name VARCHAR(255),
  nomination_category_unique_id VARCHAR(255),
  nomination_category_id UUID,
  division_nation_name VARCHAR(255),
  division_nation_code VARCHAR(255),
  division_region_name VARCHAR(255),
  division_region_code VARCHAR(255),
  division_continent_name VARCHAR(255),
  division_continent_code VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_code VARCHAR(255),
  verification_mail_sent_at TIMESTAMP,
  verified_at TIMESTAMP,
  verified_via VARCHAR(255),
  voting_year INTEGER,
  meta JSONB DEFAULT '{}',
  unique_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (nomination_category_id) REFERENCES nomination_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS email_fingerprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  visitor_id VARCHAR(255) NOT NULL,
  provider TEXT NOT NULL, -- Adjust this according to your ENUM or type definition
  fingerprint JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  verification_reference_unique_id VARCHAR(255),
  verification_reference_type VARCHAR(255),
  unique_id VARCHAR(255) NOT NULL UNIQUE,
  index_key VARCHAR(255) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value VARCHAR(500) NOT NULL,
    Description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    perfix VARCHAR(10) NOT NULL, -- prifix should be unique
    start_number INT NOT NULL, -- start number can not be repeated
    current_number INT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- create invoice_settings_logs to capture invoice_settings history
-- NEXT DISCUSSION
-- property, vote, email_fingerprint >table
-- create separate payment table
-- implement inheritence in porperty table

-- todo
-- join table for properties_nominationcategories
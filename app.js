console.log("Cetinkaya Ahşap uygulaması başlatıldı.");

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Key mevcut:", !!SUPABASE_KEY);
console.log(
    "Supabase Key uzunluğu:",
    SUPABASE_KEY ? SUPABASE_KEY.length : 0
);

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function testSupabaseConnection() {

    const { data, error } = await supabaseClient
        .from("categories")
        .select("*")
        .limit(1);

    if (error) {
        console.error("Supabase bağlantı hatası:", error);
        return;
    }

    console.log("Supabase bağlantısı başarılı:", data);
}

testSupabaseConnection();

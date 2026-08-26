const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Cetinkaya Ahşap uygulaması başlatıldı.");

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

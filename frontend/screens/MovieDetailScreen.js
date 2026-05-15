import React, { useEffect } from "react";
import {
    View, Text, Image, ScrollView,
    TouchableOpacity, StyleSheet, Linking
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Tag from "../components/Tag";
import { addFavorite, removeFavorite, fetchMovieById } from "../redux/actions";

// Chuyển embed URL → URL xem được trên trình duyệt
// "https://www.youtube.com/embed/TcMBFSGVi1c" → "https://youtu.be/TcMBFSGVi1c"
function toWatchableUrl(url) {
    if (!url) return null;
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return `https://youtu.be/${embedMatch[1]}`;
    return url; // trả nguyên nếu đã là URL xem được
}

// Tạo URL tìm kiếm trailer trên YouTube nếu phim không có trailer_url
function fallbackTrailerUrl(title, year) {
    const q = encodeURIComponent(`${title} ${year || ""} official trailer`);
    return `https://www.youtube.com/results?search_query=${q}`;
}

const MovieDetailScreen = ({ route, navigation }) => {
    const { movie: passed } = route.params;
    const dispatch    = useDispatch();
    const token       = useSelector(s => s.token);
    const favoriteIds = useSelector(s => s.favoriteIds);
    const selected    = useSelector(s => s.selectedMovie);

    useEffect(() => {
        if (passed.id && !isNaN(passed.id)) dispatch(fetchMovieById(passed.id));
    }, [passed.id]);

    const movie  = (selected && String(selected.id) === String(passed.id)) ? selected : passed;
    const isFav  = favoriteIds.includes(Number(movie.id));
    const genres = movie.genres || (movie.genre ? movie.genre.split(", ") : []);

    // Nút Trailer: ưu tiên trailer_url từ DB, fallback tìm YouTube
    const trailerUrl = toWatchableUrl(movie.trailer_url)
        || fallbackTrailerUrl(movie.title, movie.year);

    const toggleFav = () => {
        if (!token) { navigation.navigate("Login"); return; }
        if (isFav)  dispatch(removeFavorite(Number(movie.id), token));
        else        dispatch(addFavorite(Number(movie.id), token));
    };

    const handleWatch = () => {
        if (!token) { navigation.navigate("Login"); return; }
        navigation.navigate("VideoPlayer", { movie });
    };

    const imgSource = movie.image ? movie.image : { uri: movie.poster_url };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Poster + overlay nút heart */}
            <View style={styles.posterWrap}>
                <Image source={imgSource} style={styles.poster} />
                {/* Gradient giả bằng View mờ dần dưới ảnh */}
                <View style={styles.posterGradient} />
                <TouchableOpacity style={styles.fabHeart} onPress={toggleFav}>
                    <Ionicons
                        name={isFav ? "heart" : "heart-outline"}
                        size={26}
                        color={isFav ? "#e50914" : "#fff"}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Tiêu đề + meta */}
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.meta}>
                    {movie.year}
                    {movie.rating   ? `  ·  ⭐ ${movie.rating}`  : ""}
                    {movie.director ? `  ·  🎬 ${movie.director}` : ""}
                </Text>

                {/* Tags thể loại */}
                <View style={styles.tags}>
                    {genres.map((g, i) => <Tag key={i} label={g} color="#e50914" />)}
                    <Tag label="HD" color="#46d369" />
                </View>

                {/* Nội dung */}
                <Text style={styles.label}>Nội dung</Text>
                <Text style={styles.desc}>
                    {movie.description || "Nội dung sẽ được cập nhật từ API."}
                </Text>

                {/* Diễn viên */}
                {movie.cast_list ? (
                    <>
                        <Text style={styles.label}>Diễn viên</Text>
                        <Text style={styles.desc}>{movie.cast_list}</Text>
                    </>
                ) : null}

                {/* Divider */}
                <View style={styles.divider} />

                {/* Nút Xem Trailer — LUÔN HIỆN */}
                <TouchableOpacity
                    style={styles.trailerBtn}
                    onPress={() => Linking.openURL(trailerUrl)}
                >
                    <Ionicons name="logo-youtube" size={22} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.trailerText}>Xem Trailer</Text>
                </TouchableOpacity>

                {/* Nút Xem Phim */}
                <TouchableOpacity style={styles.watchBtn} onPress={handleWatch}>
                    <Ionicons name="play-circle" size={22} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.watchText}>Xem Phim Ngay</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0a0a",
    },
    posterWrap: {
        position: "relative",
    },
    poster: {
        width: "100%",
        height: 340,
        resizeMode: "cover",
    },
    posterGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "transparent",
        // gradient giả: View mờ dần từ trong suốt → đen
        background: "linear-gradient(transparent, #0a0a0a)",
        opacity: 0.85,
    },
    fabHeart: {
        position: "absolute",
        top: 292,
        right: 16,
        backgroundColor: "rgba(0,0,0,0.65)",
        borderRadius: 24,
        padding: 8,
    },
    content: {
        padding: 16,
        paddingTop: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 6,
    },
    meta: {
        fontSize: 13,
        color: "#b3b3b3",
        marginBottom: 14,
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 18,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
    },
    desc: {
        fontSize: 14,
        lineHeight: 22,
        color: "#b3b3b3",
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: "#1c1c1c",
        marginBottom: 20,
    },
    trailerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#cc0000",
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
    },
    trailerText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    watchBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e50914",
        borderRadius: 8,
        padding: 16,
        marginBottom: 36,
    },
    watchText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MovieDetailScreen;

const express = require('express');
const cors = require('cors');
const path = require('path');
const jsonfile = require('jsonfile'); // jsonfile 모듈 추가
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위해 추가

app.get('/api/v1/travelPost/:id', (req, res) => {
    const postFilePath = path.join(__dirname, `${req.params.id}.json`);
    res.sendFile(postFilePath);
});

// 좋아요 토글 API
app.post('/api/v1/travelPost/:id/like/toggle', (req, res) => {
    const postFilePath = path.join(__dirname, `${req.params.id}.json`);
    jsonfile.readFile(postFilePath, (err, post) => {
        if (err) {
            res.status(500).send({ error: "파일 읽기에 실패했습니다." });
            return;
        }
        // 좋아요 상태 토글
        post.likeCount = (post.likeCount || 0) + (post.isLiked ? -1 : 1);
        post.isLiked = !post.isLiked;
        // 파일에 다시 저장
        jsonfile.writeFile(postFilePath, post, { spaces: 2 }, (err) => {
            if (err) {
                res.status(500).send({ error: "파일 저장에 실패했습니다." });
                return;
            }
            res.send({ likeCount: post.likeCount, isLiked: post.isLiked });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

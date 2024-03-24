import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Product } from "@/client/models/products";

export const CardProductSkeleton: React.FC = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton width="100%" height="160px" />
        <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
          <Skeleton width="40px" height="100%" />
          <Skeleton width="80%" height="100%" />
          <Skeleton width="100%" height="100%" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <Skeleton width="140px" height="100%" />
      </Box>
    </Box>
  );
};

export const CardProduct: React.FC<Product> = ({
  id,
  title,
  price,
  category,
  description,
  image,
}) => {
  return (
    <Card sx={{ width: "100%", border: "1px solid #090817" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
            }}
          >
            ${price}
          </Typography>

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              minHeight: "64px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              minHeight: "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          📍 {category}
        </Button>
      </CardActions>
    </Card>
  );
};

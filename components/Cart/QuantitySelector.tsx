import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { IconButton, Stack, Typography } from "@mui/material";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  label: string;
  onChange: (quantity: number) => void;
}

function QuantitySelector({ quantity, max, label, onChange }: QuantitySelectorProps) {
  const isAtMax = max !== undefined && quantity >= max;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 5,
        width: "fit-content",
      }}
    >
      <IconButton
        size="small"
        aria-label={`Decrease quantity of ${label}`}
        onClick={() => onChange(quantity - 1)}
      >
        <Remove fontSize="small" />
      </IconButton>
      <Typography
        aria-live="polite"
        sx={{ minWidth: 28, textAlign: "center", fontWeight: 600 }}
      >
        {quantity}
      </Typography>
      <IconButton
        size="small"
        aria-label={`Increase quantity of ${label}`}
        disabled={isAtMax}
        onClick={() => onChange(quantity + 1)}
      >
        <Add fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default QuantitySelector;

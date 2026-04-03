import React from 'react';

// Definisi tipe untuk props
interface ServiceCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    highlighted?: boolean;
}

function ServiceCardItem({ icon, title, description, highlighted = false }: ServiceCard) {
    // Warna-warna dinamis berdasarkan prop 'highlighted'
    const bgColor = highlighted ? '#00A4B9' : '#F6F6F6';
    const titleColor = highlighted ? '#FCFCFC' : '#262626';
    const descColor = highlighted ? '#FCFCFC' : '#404040';
    const iconBg = '#FCFCFC'; // Latar ikon selalu putih
    const iconColor = highlighted ? '#00A4B9' : '#00A4B9';

    return (
        // Kontainer utama dengan ukuran tetap dan posisi relatif
        <div
            className="relative flex-shrink-0 overflow-visible"
            style={{
                width: '378.67px',
                height: '262px',
                flex: '1', 
            }}
        >
            {/* Kartu Utama */}
            <div
                className="absolute inset-0 flex flex-col items-start p-4"
                style={{
                    background: bgColor,
                    borderRadius: '24px',
                    gap: '32px',
                }}
            >
                {/* Kotak Ikon */}
                <div
                    className="flex shrink-0 items-center justify-center"
                    style={{
                        width: '64px',
                        height: '64px',
                        background: iconBg,
                        borderRadius: '12px',
                        padding: '12px',
                    }}
                >
                    <div style={{ color: iconColor }}>
                        {icon}
                    </div>
                </div>

                {/* Konten Teks (Headline) */}
                <div
                    className="flex flex-col"
                    style={{
                        gap: '8px',
                        width: '346px',
                    }}
                >
                    <h3
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: '20px',
                            lineHeight: '30px',
                            color: titleColor,
                            margin: 0,
                        }}
                    >
                        {title}
                    </h3>
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: descColor,
                            margin: 0,
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>

            {/* Efek "Outsider" — Kanan Atas */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bg-transparent"
                style={{
                    width: '24px',
                    height: '24px',
                    right: '-24px',
                    top: '0px',
                    borderTopLeftRadius: '24px',
                    boxShadow: `-12px 12px 0 12px ${bgColor}`,
                }}
            />

            {/* Efek "Outsider" — Kiri Bawah */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bg-transparent"
                style={{
                    width: '24px',
                    height: '24px',
                    left: '0px',
                    bottom: '-24px',
                    borderBottomRightRadius: '24px',
                    boxShadow: `12px -12px 0 12px ${bgColor}`,
                }}
            />
        </div>
    );
}

export default ServiceCardItem;

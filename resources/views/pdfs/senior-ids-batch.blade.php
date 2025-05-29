<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Senior Citizen IDs - Batch Print</title>    <style>
        @page {            size: 504pt 153pt;
            margin: 0;
            padding: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #000;
        }
        
        .id-card {
            width: 504pt;
            height: 153pt;
            position: relative;
            background: #fff;
            page-break-after: always;
            border: 1px solid #000;
        }
        
        .id-card:last-child {
            page-break-after: auto;
        }
          .id-content {
            padding: 9pt;
            display: grid;
            grid-template-columns: 108pt 288pt 108pt;
            height: 100%;
        }
        
        .photo-section {
            text-align: center;
            padding: 9pt;
        }
        
        .photo {
            width: 90pt;
            height: 90pt;
            border: 1px solid #ccc;
            display: inline-block;
            overflow: hidden;
        }
        
        .photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .info-section {
            padding: 0.125in;
            font-size: 11pt;
        }
        
        .senior-name {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 0.125in;
        }
        
        .info-row {
            margin-bottom: 0.0625in;
        }
        
        .qr-section {
            text-align: center;
            padding: 0.125in;
        }
        
        .qr-code {
            width: 1.25in;
            height: 1.25in;
        }
        
        .id-number {
            font-size: 10pt;
            margin-top: 0.0625in;
            text-align: center;
        }
        
        .header {
            background-color: #0047AB;
            color: white;
            text-align: center;
            padding: 0.0625in;
            font-weight: bold;
            margin-bottom: 0.125in;
        }
        
        .label {
            color: #555;
            font-size: 9pt;
        }
        
        .value {
            font-weight: bold;
            font-size: 10pt;
        }
        .signature-section {
            margin-top: 8px;
            border-top: 1px solid #ccc;
            padding-top: 4px;
        }
        .issuer-section {
            margin-top: 4px;
            font-size: 7pt;
        }
        .reminders {
            margin-top: 4px;
            font-style: italic;
            font-size: 6pt;
        }
        .id-number {
            font-size: 7pt;
            color: #333;
            margin-bottom: 2px;
            text-align: center;
        }
        .date-issued {
            font-size: 6pt;
            color: #666;
            text-align: right;
            position: absolute;
            bottom: 18px;
            right: 8px;
        }
        .page-break {
            page-break-after: always;
            clear: both;
        }
    </style>
</head>
<body>    @foreach($seniorsData as $data)
        <?php $senior = $data['senior']; ?>
        <div class="id-card">
            <div class="header">
                <div>REPUBLIC OF THE PHILIPPINES</div>
                <div>SENIOR CITIZEN IDENTIFICATION CARD</div>
            </div>
            
            <div class="id-content">
                <div class="photo-section">
                    @if($data['photoUrl'])
                        <img src="{{ $data['photoUrl'] }}" class="photo" alt="Senior Photo"/>
                    @else
                        <div class="photo" style="display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
                            <span style="font-size: 10pt; color: #666;">No Photo</span>
                        </div>
                    @endif
                </div>
                
                <div class="info-section">
                    <div class="senior-name">
                        {{ $senior->first_name }}
                        {{ $senior->middle_name ? substr($senior->middle_name, 0, 1) . '.' : '' }}
                        {{ $senior->last_name }}
                        {{ $senior->suffix ?? '' }}
                    </div>
                    
                    <div class="info-row">
                        <span class="label">Birth Date:</span>
                        <span class="value">{{ $senior->birth_date->format('F j, Y') }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">Address:</span>
                        <span class="value">{{ $senior->address }}, {{ $senior->barangay }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">Contact:</span>
                        <span class="value">{{ $senior->contact_number ?: 'N/A' }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">Emergency Contact:</span><br>
                        <span class="value">
                            {{ $senior->emergency_contact_name ?: 'N/A' }} -
                            {{ $senior->emergency_contact_number ?: 'N/A' }}
                        </span>
                    </div>
                </div>
                
                <div class="qr-section">
                    <img src="{{ $data['qrCodeUrl'] }}" class="qr-code" alt="QR Code">
                    <div class="id-number">
                        {{ $senior->senior_citizen_id }}
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Senior Citizen ID</title>
    <style>
        @page {
            margin: 0;
            padding: 0;
            size: 7in 2.125in landscape;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            width: 7in;
            height: 2.125in;
            margin: 0;
            padding: 0;
            font-size: 9pt;
        }
        .id-container {
            width: 7in;
            height: 2.125in;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .id-card {
            width: 3.375in;
            height: 2.125in;
            border: 1px solid #000;
            background-color: white;
            position: relative;
        }        .id-header {
            background: linear-gradient(135deg, #1a5f7a 0%, #0047AB 100%);
            color: white;
            text-align: center;
            padding: 5px 0;
            font-weight: bold;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }
        .id-content {
            display: flex;
            padding: 8px;
        }
        .id-photo-section {
            width: 35%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .id-photo {
            width: 1in;
            height: 1.25in;
            border: 1px solid #ddd;
            margin-bottom: 3px;
            background-color: #f0f0f0;
            overflow: hidden;
        }
        .id-details {
            width: 65%;
            padding-left: 8px;
        }
        .id-field {
            margin-bottom: 3px;
        }
        .id-label {
            font-size: 6pt;
            color: #555;
            margin-bottom: 1px;
            text-transform: uppercase;
        }
        .id-value {
            font-size: 8pt;
            font-weight: bold;
        }        .id-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1a5f7a 0%, #0047AB 100%);
            color: white;
            text-align: center;
            padding: 3px;
            font-size: 6.5pt;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .back-content {
            padding: 8px;
            font-size: 7pt;
        }
        .benefits-list {
            margin: 4px 0;
            padding-left: 12px;
            line-height: 1.2;
        }
        .benefits-list li {
            margin-bottom: 2px;
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
        .back-id {
            margin-left: 15px;
        }
        @media print {
            body {
                padding: 0;
            }
            .id-container {
                margin: 0;
                padding-top: 0.5in;
            }
            .id-card {
                margin: 0 7.5px;
            }
        }
    </style>
</head>
<body>
    <div class="id-container">
        <!-- Front of ID -->
        <div class="id-card">
            <div class="id-header">
                <div style="font-size: 8pt;">REPUBLIC OF THE PHILIPPINES</div>
                <div style="font-size: 10pt;">SENIOR CITIZEN IDENTIFICATION CARD</div>
            </div>
            
            <div class="id-content">
                <div class="id-photo-section">
                    <div class="id-photo">
                        @if($photoUrl)
                            <img src="{{ $photoUrl }}" style="width: 100%; height: 100%; object-fit: cover;" />
                        @else
                            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                                <span style="font-size: 8pt; color: #888;">2x2 ID Photo</span>
                            </div>
                        @endif
                    </div>
                    <div class="id-number">SC ID NO.: {{ $senior->senior_citizen_id }}</div>
                </div>
                
                <div class="id-details">
                    <div class="id-field">
                        <div class="id-label">Full Name</div>
                        <div class="id-value">
                            {{ $senior->first_name }}
                            {{ $senior->middle_name ? substr($senior->middle_name, 0, 1) . '.' : '' }}
                            {{ $senior->last_name }}
                            {{ $senior->suffix ?? '' }}
                        </div>
                    </div>
                    
                    <div class="id-field">
                        <div class="id-label">Address</div>
                        <div class="id-value" style="font-size: 7pt;">{{ $senior->address }}, Brgy. {{ $senior->barangay }}</div>
                    </div>
                    
                    <div class="id-field">
                        <div class="id-label">Date of Birth / Age</div>
                        <div class="id-value">{{ $senior->birth_date->format('m/d/Y') }} / {{ $senior->birth_date->age }} years old</div>
                    </div>
                    
                    <div class="id-field">
                        <div class="id-label">Sex</div>
                        <div class="id-value">{{ $senior->gender }}</div>
                    </div>
                    
                    <div class="id-field">
                        <div class="id-label">Emergency Contact</div>
                        <div class="id-value" style="font-size: 7pt;">
                            {{ $senior->emergency_contact_name ?? 'N/A' }} - {{ $senior->emergency_contact_number ?? 'N/A' }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="date-issued">
                Date Issued: {{ now()->format('m/d/Y') }}
            </div>
            
            <div class="id-footer">
                <div>Valid Government-Issued ID • Not Valid Without Official Seal</div>
            </div>
        </div>

        <!-- Back of ID -->
        <div class="id-card back-id">
            <div class="id-header">
                <div style="font-size: 8pt;">REPUBLIC OF THE PHILIPPINES</div>
                <div style="font-size: 8pt;">OFFICE FOR SENIOR CITIZENS AFFAIRS (OSCA)</div>
                <div style="font-size: 7pt;">BACK PORTION OF SENIOR CITIZEN ID</div>
            </div>
            
            <div class="back-content">
                <div style="text-align: center; font-weight: bold; margin-bottom: 3px;">BENEFITS AND PRIVILEGES UNDER R.A. 9994</div>
                <div style="font-weight: bold;">20% DISCOUNT & VAT EXEMPTION on:</div>
                <ul class="benefits-list">
                    <li>Medicines and medical supplies</li>
                    <li>Doctor's fees and hospital bills</li>
                    <li>Domestic transportation (land, air, sea)</li>
                    <li>Restaurants and recreation centers</li>
                    <li>Funeral and burial services</li>
                    <li>Utility discounts (water & electricity)</li>
                    <li>Priority lanes in all establishments</li>
                    <li>Government assistance and programs</li>
                </ul>

                <div class="signature-section">
                    <div style="text-align: center; margin-bottom: 3px;">ID HOLDER'S SIGNATURE / THUMBMARK</div>
                    <div style="margin: 8px 20px; border-bottom: 1px solid #000;">
                        <br>
                    </div>
                    <div style="text-align: center; font-style: italic; font-size: 6pt;">(If unable to sign, affix thumbmark)</div>
                </div>

                <div class="issuer-section">
                    <div style="margin-bottom: 2px;">ID CONTROL NO.: {{ $senior->senior_citizen_id }}</div>
                    <div>
                        <strong>ISSUED BY:</strong><br>
                        Name: Juan Dela Cruz<br>
                        Designation: OSCA Head – Bansud, Oriental Mindoro<br>
                        Date of Issue: {{ now()->format('F d, Y') }}<br>
                        Validity: Lifetime
                    </div>
                </div>

                <div class="reminders">
                    <strong>IMPORTANT REMINDERS:</strong><br>
                    • This ID is non-transferable.<br>
                    • Misuse of this ID is punishable by law.<br>
                    • Report lost IDs immediately to OSCA.
                </div>
            </div>
        </div>
    </div>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Benefits Distribution Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.5;
        }
        .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        h2 {
            font-size: 18px;
            margin: 25px 0 15px 0;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .report-date {
            font-size: 12px;
            color: #666;
        }
        .summary-box {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .summary-item {
            display: inline-block;
            margin-right: 50px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .chart-container {
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OSCA BENEFITS DISTRIBUTION REPORT</h1>
            <div class="report-date">Generated on {{ $currentDate }}</div>
        </div>

        <div class="summary-box">
            <div class="summary-item">Total Benefits: {{ $benefits->count() }}</div>
            <div class="summary-item">Total Senior Citizens: {{ $totalSeniors }}</div>
            <div class="summary-item">Reporting Period: All time</div>
        </div>

        <h2>Benefits Distribution Summary</h2>
        <table>
            <thead>
                <tr>
                    <th>Benefit Name</th>
                    <th>Description</th>
                    <th>Recipients Count</th>
                    <th>Percentage of Seniors</th>
                </tr>
            </thead>
            <tbody>
                @foreach($benefits as $benefit)
                <tr>
                    <td>{{ $benefit->name }}</td>
                    <td>{{ $benefit->description ?? 'No description provided' }}</td>
                    <td>{{ $benefit->seniors->count() }}</td>
                    <td>{{ $totalSeniors > 0 ? round(($benefit->seniors->count() / $totalSeniors) * 100, 1) : 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <h2>Detailed Benefit Distribution</h2>
        @foreach($benefits as $benefit)
            <h3>{{ $benefit->name }} ({{ $benefit->seniors->count() }} recipients)</h3>
            <table>
                <thead>
                    <tr>
                        <th>Senior Citizen ID</th>
                        <th>Name</th>
                        <th>Barangay</th>
                        <th>Date Received</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($benefit->seniors as $senior)
                    <tr>
                        <td>{{ $senior->senior_citizen_id }}</td>
                        <td>
                            {{ $senior->last_name }}, {{ $senior->first_name }}
                            {{ $senior->middle_name ? substr($senior->middle_name, 0, 1) . '.' : '' }}
                            {{ $senior->suffix ?? '' }}
                            {{ $senior->is_deceased ? '(Deceased)' : '' }}
                        </td>
                        <td>{{ $senior->barangay->name }}</td>
                        <td>{{ date('m/d/Y', strtotime($senior->pivot->date_received)) }}</td>
                        <td>{{ $senior->pivot->remarks ?? 'N/A' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endforeach

        <div class="footer">
            <p>This is an official document of the Office of Senior Citizens Affairs (OSCA).</p>
            <p>Page 1 of 1</p>
        </div>
    </div>
</body>
</html>

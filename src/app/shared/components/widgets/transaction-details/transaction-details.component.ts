import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TransactionPinework } from 'src/app/types/TransactionPinetwork';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Input() transaction: TransactionPinework;
  expandedSections: { [key: string]: boolean } = {
    links: false,
    technical: false,
    envelope: false,
    results: false,
  };
  activeTab = 'details';
  tooltipVisible = false;
  tooltipText = '';
  tooltipPosition = { x: 0, y: 0 };
  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    this.showTooltip('Copié');
  }

  showTooltip(text: string): void {
    this.toastService.show('dark', text);

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  formatAmount(amount: string): string {
    const piAmount = Number.parseFloat(amount) / 10000000;
    return Number(piAmount).toLocaleString();
  }

  truncateHash(hash: string): string {
    if (!hash) return "";
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  openInPiExplorer(): void {
    window.open(environment.EXPLORER_URL+"/transactions/"+this.transaction.id, '_blank');
  }
}

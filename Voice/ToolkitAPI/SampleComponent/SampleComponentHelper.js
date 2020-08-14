({
    subscribeToVoiceToolkit: function(cmp) {
        cmp._telephonyEventListener = $A.getCallback(this.telephonyEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_CONNECTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('MUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('UNMUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('HOLD', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('RESUME', cmp._telephonyEventListener);
        
        cmp._conversationEventListener = $A.getCallback(this.conversationEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },

    unsubscribeFromVoiceToolkit: function(cmp) {
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_CONNECTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('MUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('UNMUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('HOLD', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('RESUME', cmp._telephonyEventListener);
        
        cmp.find('voiceToolkitApi').removeConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    telephonyEventListener: function(cmp, event) {
        cmp.set('v.message', JSON.stringify(event));
    },
    
    conversationEventListener: function(cmp, transcript) {
        cmp.set('v.transcript', JSON.stringify(transcript));
    },
    
    updateNextBestActions: function(cmp) {
        // Message must be in the format { key: 'value' }
        // Use in Next Best Action strategy filter element with $Request.key
        // https://help.salesforce.com/articleView?id=nba_strategy_expressions.htm&type=5
        var params = JSON.parse(cmp.get('v.payload'));
        cmp.find('voiceToolkitApi').updateNextBestActions(cmp.get('v.recordId'), params);
    }
})
QueryBuilder.templates.group = '\
<div id="{{= it.group_id }}" class="rules-group-container"> \
  <div class="rules-group-header clearfix"> \
  <div class="btn-group group-conditions pull-left"> \
    {{~ it.conditions: condition }} \
      <label class="btn btn-xs btn-info"> \
        <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }} \
      </label> \
    {{~}} \
  </div> \
    <div class="btn-group pull-left group-actions" style="margin-left: 8px;"> \
      <button type="button" class="btn btn-xs btn-primary" data-add="rule"> \
        <i class="material-icons">{{= it.icons.add_rule }}</i> <span class="btn-label">{{= it.translate("add_rule") }}</span> \
      </button> \
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
        <button type="button" class="btn btn-xs btn-primary" data-add="group"> \
          <i class="material-icons">{{= it.icons.add_group }}</i> <span class="btn-label">{{= it.translate("add_group") }}</span>  \
        </button> \
      {{?}} \
      {{? it.level>1 }} \
        <button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
          <i class="material-icons">{{= it.icons.remove_group }}</i> <span class="btn-label">{{= it.translate("delete_group") }}</span> \
        </button> \
      {{?}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="material-icons">{{= it.icons.error }}</i></div> \
    {{?}} \
  </div> \
  <div class=rules-group-body> \
    <div class=rules-list></div> \
  </div> \
</div>';

QueryBuilder.templates.rule = '\
<div id="{{= it.rule_id }}" class="rule-container"> \
  {{? it.settings.display_errors }} \
    <div class="error-container"><i class="material-icons">{{= it.icons.error }}</i></div> \
  {{?}} \
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
  <div class="rule-header" style="display:inline-block;"> \
    <div class="btn-group rule-actions"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule"> \
        <i class="material-icons">{{= it.icons.remove_rule }}</i> <span class="btn-label"  style="display:none;">{{= it.translate("delete_rule") }}</span> \
      </button> \
    </div> \
  </div> \
</div>';

QueryBuilder.templates.filterSelect = '\
{{ var optgroup = null; }} \
<select class="form-control brew-select2" name="{{= it.rule.id }}_filter"> \
  {{? it.settings.display_empty_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.filters: filter }} \
    {{? optgroup !== filter.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = filter.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= filter.id }}">{{= it.translate(filter.label) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

// Material
// QueryBuilder.templates.filterSelect = '\
// {{ var optgroup = null; }} \
// <md-select ng-model="{{= it.rule.id }}_filter" class="form-control" aria-label="{{= it.rule.id }}_filter" name="{{= it.rule.id }}_filter"> \
//   {{? it.settings.display_empty_filter }} \
//     <md-option value="-1">{{= it.settings.select_placeholder }}</md-option> \
//   {{?}} \
//   {{~ it.filters: filter }} \
//     {{? optgroup !== filter.optgroup }} \
//       {{? optgroup !== null }}</optgroup>{{?}} \
//       {{? (optgroup = filter.optgroup) !== null }} \
//         <md-optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
//       {{?}} \
//     {{?}} \
//     <md-option value="{{= filter.id }}">{{= it.translate(filter.label) }}</md-option> \
//   {{~}} \
//   {{? optgroup !== null }}</md-optgroup>{{?}} \
// </md-select>';

QueryBuilder.templates.operatorSelect = '\
{{? it.operators.length === 1 }} \
<span> \
{{= it.translate("operators", it.operators[0].type) }} \
</span> \
{{?}} \
{{ var optgroup = null; }} \
<select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator"> \
  {{~ it.operators: operator }} \
    {{? optgroup !== operator.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = operator.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= operator.type }}">{{= it.translate("operators", operator.type) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

// Material
// QueryBuilder.templates.operatorSelect = '\
// {{? it.operators.length === 1 }} \
// <span> \
// {{= it.translate("operators", it.operators[0].type) }} \
// </span> \
// {{?}} \
// {{ var optgroup = null; }} \
// <md-select class="form-control {{? it.operators.length === 1 }}hide{{?}}" ng-model="{{= it.rule.id }}_operator" aria-label="{{= it.rule.id }}_operator" name="{{= it.rule.id }}_operator"> \
//   {{~ it.operators: operator }} \
//     {{? optgroup !== operator.optgroup }} \
//       {{? optgroup !== null }}</md-optgroup>{{?}} \
//       {{? (optgroup = operator.optgroup) !== null }} \
//         <md-optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
//       {{?}} \
//     {{?}} \
//     <md-option value="{{= operator.type }}">{{= it.translate("operators", operator.type) }}</md-option> \
//   {{~}} \
//   {{? optgroup !== null }}</md-optgroup>{{?}} \
// </md-select>';

/**
 * Returns group's HTML
 * @param {string} group_id
 * @param {int} level
 * @returns {string}
 * @fires QueryBuilder.changer:getGroupTemplate
 * @private
 */
QueryBuilder.prototype.getGroupTemplate = function(group_id, level) {
    var h = this.templates.group({
        builder: this,
        group_id: group_id,
        level: level,
        conditions: this.settings.conditions,
        icons: this.icons,
        settings: this.settings,
        translate: this.translate.bind(this)
    });

    /**
     * Modifies the raw HTML of a group
     * @event changer:getGroupTemplate
     * @memberof QueryBuilder
     * @param {string} html
     * @param {int} level
     * @returns {string}
     */
    return this.change('getGroupTemplate', h, level);
};

/**
 * Returns rule's HTML
 * @param {string} rule_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleTemplate
 * @private
 */
QueryBuilder.prototype.getRuleTemplate = function(rule_id) {
    var h = this.templates.rule({
        builder: this,
        rule_id: rule_id,
        icons: this.icons,
        settings: this.settings,
        translate: this.translate.bind(this)
    });

    /**
     * Modifies the raw HTML of a rule
     * @event changer:getRuleTemplate
     * @memberof QueryBuilder
     * @param {string} html
     * @returns {string}
     */
    return this.change('getRuleTemplate', h);
};

/**
 * Returns rule's filter HTML
 * @param {Rule} rule
 * @param {object[]} filters
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleFilterTemplate
 * @private
 */
QueryBuilder.prototype.getRuleFilterSelect = function(rule, filters) {
    var h = this.templates.filterSelect({
        builder: this,
        rule: rule,
        filters: filters,
        icons: this.icons,
        settings: this.settings,
        translate: this.translate.bind(this)
    });

    /**
     * Modifies the raw HTML of the rule's filter dropdown
     * @event changer:getRuleFilterSelect
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {QueryBuilder.Filter[]} filters
     * @returns {string}
     */
    return this.change('getRuleFilterSelect', h, rule, filters);
};

/**
 * Returns rule's operator HTML
 * @param {Rule} rule
 * @param {object[]} operators
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleOperatorTemplate
 * @private
 */
QueryBuilder.prototype.getRuleOperatorSelect = function(rule, operators) {
    var h = this.templates.operatorSelect({
        builder: this,
        rule: rule,
        operators: operators,
        icons: this.icons,
        settings: this.settings,
        translate: this.translate.bind(this)
    });

    /**
     * Modifies the raw HTML of the rule's operator dropdown
     * @event changer:getRuleOperatorSelect
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {QueryBuilder.Operator[]} operators
     * @returns {string}
     */
    return this.change('getRuleOperatorSelect', h, rule, operators);
};

/**
 * Returns the rule's value HTML
 * @param {Rule} rule
 * @param {int} value_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleInput
 * @private
 */
QueryBuilder.prototype.getRuleInput = function(rule, value_id) {
    var filter = rule.filter;
    var validation = rule.filter.validation || {};
    var name = rule.id + '_value_' + value_id;
    var c = filter.vertical ? ' class=block' : '';
    var h = '';

    if (typeof filter.input == 'function') {
        h = filter.input.call(this, rule, name);
    } else {
        switch (filter.input) {
            case 'radio':
            Utils.iterateOptions(filter.values, function(key, val) {
                h += '<label class="radio inline"' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> <span>' + val + '</span></label> ';
            });
            break;

            case 'checkbox':
                Utils.iterateOptions(filter.values, function(key, val) {
                    h += '<label class="checkbox inline"' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> <span>' + val + '</span></label> ';
                });
                break;

            case 'select':
                h += '<select class="form-control" name="' + name + '"' + (filter.multiple ? ' multiple' : '') + '>';
                if (filter.placeholder) {
                    h += '<option value="' + filter.placeholder_value + '" disabled selected>' + filter.placeholder + '</option>';
                }
                Utils.iterateOptions(filter.values, function(key, val) {
                    h += '<option value="' + key + '">' + val + '</option> ';
                });
                h += '</select>';
                break;

            case 'textarea':
                h += '<textarea class="form-control" name="' + name + '"';
                if (filter.size) h += ' cols="' + filter.size + '"';
                if (filter.rows) h += ' rows="' + filter.rows + '"';
                if (validation.min !== undefined) h += ' minlength="' + validation.min + '"';
                if (validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
                if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                h += '></textarea>';
                break;

            case 'number':
                h += '<input class="form-control" type="number" name="' + name + '"';
                if (validation.step !== undefined) h += ' step="' + validation.step + '"';
                if (validation.min !== undefined) h += ' min="' + validation.min + '"';
                if (validation.max !== undefined) h += ' max="' + validation.max + '"';
                if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                if (filter.size) h += ' size="' + filter.size + '"';
                h += '>';
                break;

            default:
                h += '<input class="form-control" type="text" name="' + name + '"';
                if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                if (filter.type === 'string' && validation.min !== undefined) h += ' minlength="' + validation.min + '"';
                if (filter.type === 'string' && validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
                if (filter.size) h += ' size="' + filter.size + '"';
                h += '>';
        }
    }

    /**
     * Modifies the raw HTML of the rule's input
     * @event changer:getRuleInput
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {string} name - the name that the input must have
     * @returns {string}
     */
    return this.change('getRuleInput', h, rule, name);
};
